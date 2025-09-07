import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import CreateProjectDto from './DTO/create-project.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '../auth/gurd/auth.guard';
import RoleEnum from '../user/ENUM/role.enum';
import * as https from 'node:https';
import httpResponseUtil from '../util/httpResponse.util';
import { Project } from './project.entity';
import { RolesGuard } from '../auth/gurd/role.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles([RoleEnum.client])
  @UseGuards(AuthGuard, RolesGuard)
  createProject(@Body() body: CreateProjectDto, @Req() req: Request) {
    return httpResponseUtil(
      200,
      'create project',
      this.projectService.createProject(req['user'], body),
    );
  }

  @Get()
  @Roles([RoleEnum.client, RoleEnum.admin])
  @UseGuards(AuthGuard, RolesGuard)
  async getUserProjects(@Req() req: Request) {
    return httpResponseUtil(
      200,
      'projects retrieved',
      await this.projectService.getUserProjects(req['user']),
    );
  }
}
