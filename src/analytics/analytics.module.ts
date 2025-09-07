import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MatchModule } from '../match/match.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MatchModule, UserModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
