import { Module } from '@nestjs/common';
import { ClientService } from './client/client.service';
import { ClientModule } from './client/client.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ClientModule, DatabaseModule],
  controllers: [],
  providers: [ClientService],
})
export class AppModule {}
