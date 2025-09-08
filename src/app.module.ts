import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from './config/env.config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { MatchModule } from './match/match.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DocumentModule } from './document/document.module';
import entities from './config/entity.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureModule } from './azure/azure.module';
import { AzureConfigService } from './azure/azure-config.service';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RebuildMatchCron } from './cron/rebuild-match.cron';
import { VendorSlaMonitorCron } from './cron/vendor-sla-monitor.cron';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    MongooseModule.forRoot(envConfig().mongodb.uri ?? 'test'),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: parseInt(configService.get<string>('database.port') ?? '3306'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [...entities],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    ProjectModule,
    VendorModule,
    MatchModule,
    AnalyticsModule,
    DocumentModule,
    AzureModule,
    EmailModule,
  ],
  controllers: [],
  providers: [AzureConfigService, RebuildMatchCron, VendorSlaMonitorCron],
})
export class AppModule {}
