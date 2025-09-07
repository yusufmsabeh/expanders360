import { Module } from '@nestjs/common';
import { AzureConfigService } from './azure-config.service';

@Module({
  providers: [AzureConfigService],
  exports: [AzureConfigService],
})
export class AzureModule {}
