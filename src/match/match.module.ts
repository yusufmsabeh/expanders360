import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '../vendor/vendor.entity';
import { MatchController } from './match.controller';
import { Project } from '../project/project.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Match, Project]), UserModule],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
