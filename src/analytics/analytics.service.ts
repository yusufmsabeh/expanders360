import { Injectable } from '@nestjs/common';
import { MatchService } from '../match/match.service';
import { Vendor } from '../vendor/vendor.entity';

@Injectable()
export class AnalyticsService {
  constructor(private readonly matchService: MatchService) {}

  async topVendors() {
    return await this.matchService.getTopVendorsByCountry();
  }
}
