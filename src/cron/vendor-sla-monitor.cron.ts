import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MatchService } from '../match/match.service';
import StatusEnum from '../vendor/ENUM/status.enum';
import { VendorService } from '../vendor/vendor.service';

@Injectable()
export class VendorSlaMonitorCron {
  private readonly logger = new Logger(VendorSlaMonitorCron.name);
  constructor(
    private readonly matchService: MatchService,
    private readonly vendorService: VendorService,
  ) {}
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Running vendor SLA monitor cron job.');
    const pendingMatches = await this.matchService.getPendingMatches();
    for (const match of pendingMatches) {
      const now = new Date();
      const vendorSla = match.vendor.responseSLAHours;
      const expectedResponseTime = new Date(match.createdAt);
      expectedResponseTime.setHours(
        expectedResponseTime.getHours() + vendorSla,
      );
      if (now > expectedResponseTime) {
        match.vendor.status = StatusEnum.expired;
        this.vendorService.updateVendor(match.vendor);
      }
    }
  }
}
