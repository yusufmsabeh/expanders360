import { Injectable } from '@nestjs/common';
import { Project } from '../project/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from '../vendor/vendor.entity';
import { Repository } from 'typeorm';
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
}
