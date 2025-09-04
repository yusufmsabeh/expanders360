import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import CreateProjectDto from './DTO/create-project.dto';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import RoleEnum from '../user/role.enum';
import * as https from 'node:https';
import httpResponseUtil from '../util/httpResponse.util';
import { Project } from './project.entity';
import { RolesGuard } from '../auth/role.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles([RoleEnum.client])
  @UseGuards(AuthGuard, RolesGuard)
  createProject(@Body() body: CreateProjectDto, @Req() req: Request) {
    return this.projectService.createProject(req['user'], body);
  }

  @Get()
  @Roles([RoleEnum.client, RoleEnum.admin])
  @UseGuards(AuthGuard, RolesGuard)
  async getUserProjects(@Req() req: Request) {
    const projects: Project[] = await this.projectService.getUserProjects(
      req['user'],
    );
    return httpResponseUtil(200, 'projects retrieved', projects);
  }
}
