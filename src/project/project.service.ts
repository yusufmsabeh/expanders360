import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateProjectDto from './DTO/create-project.dto';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import RoleEnum from '../user/ENUM/role.enum';
import StatusEnum from './ENUM/status.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async createProject(user: User, createProjectDto: CreateProjectDto) {
    return await this.projectRepository.save({ ...createProjectDto, user });
  }

  async getUserProjects(user: User) {
    const findWhere = {};
    if (user.role == RoleEnum.client) findWhere['user'] = user;
    return await this.projectRepository.find({ where: findWhere });
  }

  async hasProject(projectId: number, user: User) {
    return await this.projectRepository.findOne({
      where: { id: projectId, user },
    });
  }

  async getProjectsInCountry(country: string) {
    return await this.projectRepository.find({
      where: { country },
    });
  }

  async findProjectById(id: number) {
    return await this.projectRepository.findOne({
      where: { id: id },
    });
  }

  async getActiveProjectsHasMatches(): Promise<Project[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoin('project.matches', 'match') // The innerJoin requires a corresponding match.
      .where('project.status = :status', { status: StatusEnum.active })
      .getMany();
    return projects;
  }
}
