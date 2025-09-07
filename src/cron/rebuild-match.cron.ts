import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MatchService } from '../match/match.service';

@Injectable()
export class RebuildMatchCron {
  private readonly logger = new Logger(RebuildMatchCron.name);
  constructor(private readonly matchService: MatchService) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.matchService.rebuildActiveProject();
    this.logger.debug('Rebuild match active project');
  }
}
