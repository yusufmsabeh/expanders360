import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../project/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from '../vendor/vendor.entity';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { ProjectService } from '../project/project.service';
import { DocumentService } from '../document/document.service';
import { VendorService } from '../vendor/vendor.service';
import { GetTopVendorsByCountryDto } from './DTO/get-top-vendors-by-country.dto';
import { EmailService } from '../email/email.service';
import StatusEnum from './ENUM/status.enum';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    private projectService: ProjectService,
    private documentService: DocumentService,
    private vendorService: VendorService,
    private emailService: EmailService,
  ) {}

  async createMatch(projectId: number) {
    const project: Project | null =
      await this.projectService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    let vendors: Vendor[] = await this.vendorService.getVendors();
    vendors = vendors.filter((vendor) =>
      vendor.countriesSupported.includes(project.country),
    );
    const servicesNeeded = project.servicesNeeded;
    const vendorsWithNewMatches: string[] = [];

    for (const vendor of vendors) {
      const servicesOverlap = vendor.servicesOffered.filter((service) =>
        servicesNeeded.includes(service),
      );
      const score: number =
        servicesOverlap.length * 2 + vendor.rating + vendor.responseSLAHours;
      if (await this.upsertMatch(score, project, vendor))
        vendorsWithNewMatches.push(vendor.email);
    }
    this.emailService.sendMatchNotificationEmail(
      vendorsWithNewMatches,
      project.title,
    );
  }

  async getMatches(projectId: number) {
    return this.matchRepository.find({
      where: {
        project: { id: projectId },
      },
      relations: ['project', 'vendor'],
    });
  }

  async getTopVendorsByCountry(): Promise<GetTopVendorsByCountryDto[]> {
    const allVendors = await this.vendorService.getVendors();
    const uniqueCountries = new Set<string>();
    allVendors.forEach((vendor) => {
      if (Array.isArray(vendor.countriesSupported)) {
        vendor.countriesSupported.forEach((country) =>
          uniqueCountries.add(country),
        );
      }
    });

    const result: GetTopVendorsByCountryDto[] = [];

    for (const country of uniqueCountries) {
      const topVendors = await this.vendorService.getTop3Vendors(country);
      const projectsInCountry =
        await this.projectService.getProjectsInCountry(country);
      let documentCount = 0;
      for (const project of projectsInCountry) {
        documentCount += await this.documentService.countProjectDocuments(
          project.id,
        );
      }

      result.push({
        country,
        topVendors: topVendors.map((vendor) => ({
          id: vendor.id,
          name: vendor.name,
          avgMatchScore: vendor.avgMatchScore,
        })),
        documentsCount: documentCount,
      });
    }

    return result;
  }

  async upsertMatch(
    score: number,
    project: Project,
    vendor: Vendor,
  ): Promise<Vendor | null> {
    const existingMatch = await this.matchRepository.findOne({
      where: {
        project: { id: project.id },
        vendor: { id: vendor.id },
      },
    });

    if (existingMatch) {
      existingMatch.score = score;
      await this.matchRepository.save(existingMatch);
      return null;
    } else {
      const newMatch = this.matchRepository.create({
        score,
        project,
        vendor,
      });
      await this.matchRepository.save(newMatch);

      return vendor;
    }
  }

  async rebuildActiveProject() {
    const activeProjects: Project[] =
      await this.projectService.getActiveProjectsHasMatches();
    for (const project of activeProjects) {
      await this.createMatch(project.id);
    }
  }

  async getPendingMatches() {
    return await this.matchRepository.find({
      where: {
        status: StatusEnum.pending,
      },
      relations: ['vendor'],
    });
  }
}
