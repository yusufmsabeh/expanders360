import { Injectable } from '@nestjs/common';
import { Project } from '../project/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from '../vendor/vendor.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>,
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createMatch(projectId: number) {
    const project: Project | null = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new Error('Project not found');
    }
    let vendors: Vendor[] = await this.vendorRepository.find();
    vendors = vendors.filter((vendor) =>
      vendor.countriesSupported.includes(project.country),
    );
    const servicesNeeded = project.servicesNeeded;
    for (const vendor of vendors) {
      const servicesOverlap = vendor.servicesOffered.filter((service) =>
        servicesNeeded.includes(service),
      );
      const score: number =
        servicesOverlap.length * 2 + vendor.rating + vendor.responseSLAHours;
      await this.matchRepository.upsert(
        {
          score,
          project,
          vendor,
        },
        ['project', 'vendor'],
      );
    }
  }

  async getMatches(projectId: number) {
    return this.matchRepository.findBy({
      project: { id: projectId },
    });
  }

  async getTopVendorsByCountry(): Promise<
    {
      country: string;
      topVendors: {
        id: string;
        name: string;
        avgMatchScore: number;
      }[];
    }[]
  > {
    const allVendors = await this.vendorRepository.find();
    const uniqueCountries = new Set<string>();
    allVendors.forEach((vendor) => {
      if (Array.isArray(vendor.countriesSupported)) {
        vendor.countriesSupported.forEach((country) =>
          uniqueCountries.add(country),
        );
      }
    });

    const result: {
      country: string;
      topVendors: {
        id: string;
        name: string;
        avgMatchScore: number;
      }[];
    }[] = [];

    for (const country of uniqueCountries) {
      const topVendors = await this.vendorRepository
        .createQueryBuilder('vendor')
        .innerJoin('vendor.matches', 'match')
        .where(
          'JSON_CONTAINS(vendor.countriesSupported, JSON_ARRAY(:country))',
          { country },
        )
        .andWhere('match.createdAt >= :date', {
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        })
        .groupBy('vendor.id')
        .select([
          'vendor.id AS id',
          'vendor.name AS name',
          'AVG(match.score) AS avgMatchScore',
        ])
        .orderBy('avgMatchScore', 'DESC')
        .limit(3)
        .getRawMany();

      type RawVendorResult = {
        id: string;
        name: string;
        avgMatchScore: string;
      };

      result.push({
        country,
        topVendors: (topVendors as RawVendorResult[]).map((vendor) => ({
          id: vendor.id,
          name: vendor.name,
          avgMatchScore: parseFloat(vendor.avgMatchScore),
        })),
      });
    }

    return result;
  }
}
