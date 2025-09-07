import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '../vendor/vendor.entity';
import { MatchController } from './match.controller';
import { Project } from '../project/project.entity';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { DocumentModule } from '../document/document.module';
import { VendorModule } from '../vendor/vendor.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, Match, Project]),
    UserModule,
    ProjectModule,
    DocumentModule,
    VendorModule,
    EmailModule,
  ],
  providers: [MatchService],
  controllers: [MatchController],
  exports: [MatchService],
})
export class MatchModule {}
