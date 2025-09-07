import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { RolesGuard } from '../auth/gurd/role.guard';
import RoleEnum from '../user/ENUM/role.enum';
import { AuthGuard } from '../auth/gurd/auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import httpResponseUtil from '../util/httpResponse.util';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/top-vendors')
  @Roles([RoleEnum.admin])
  @UseGuards(AuthGuard, RolesGuard)
  async topVendors() {
    return httpResponseUtil(
      200,
      'Top Vendors',
      await this.analyticsService.topVendors(),
    );
  }
}
