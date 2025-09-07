import { Injectable } from '@nestjs/common';
import { EmailClient } from '@azure/communication-email';
import envConfig from '../config/env.config';

@Injectable()
export class AzureConfigService {
  private readonly emailClient = new EmailClient(
    envConfig().azure.emailString ?? '',
  );

  getEmailClient() {
    return this.emailClient;
  }
}
