import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateProjectDto from './DTO/create-project.dto';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import RoleEnum from '../user/ENUM/role.enum';

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
}
