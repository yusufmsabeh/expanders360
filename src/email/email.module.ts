import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AzureModule } from '../azure/azure.module';

@Module({
  imports: [AzureModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
