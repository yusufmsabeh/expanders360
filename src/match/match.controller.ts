import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import httpResponseUtil from '../util/httpResponse.util';
import { RolesGuard } from '../auth/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import RoleEnum from '../user/role.enum';
import { Roles } from '../auth/roles.decorator';

@Controller('/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/:projectId')
  @Roles([RoleEnum.client, RoleEnum.admin])
  @UseGuards(AuthGuard, RolesGuard)
  async createMatch(@Param('projectId') projectId: number) {
    return httpResponseUtil(
      200,
      'match created',
      await this.matchService.createMatch(projectId),
    );
  }

  @Get('/:projectId')
  @Roles([RoleEnum.client, RoleEnum.admin])
  async getMatches(@Param('projectId') projectId: number) {
    return httpResponseUtil(
      200,
      'matches retrieved',
      await this.matchService.getMatches(projectId),
    );
  }
}
