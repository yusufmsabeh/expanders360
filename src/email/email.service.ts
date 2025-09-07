import { Injectable } from '@nestjs/common';
import { AzureConfigService } from '../azure/azure-config.service';
import envConfig from '../config/env.config';

@Injectable()
export class EmailService {
  constructor(private readonly azureConfigService: AzureConfigService) {}

  async sendMatchNotificationEmail(emails: string[], projectName) {
    const newEmail: { address: string }[] = emails.map((email) => ({
      address: email,
    }));
    const emailMessage = {
      senderAddress: envConfig().azure.email ?? '',
      content: {
        subject: `New Project Match: ${projectName} at Expander360`,
        plainText: `Hello, A new project, ${projectName}, has been matched with your company's profile. Log in to your dashboard to review the project details and submit your proposal. This could be the perfect opportunity for you to expand your business. Thanks, The Expander360 Team`,
        html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Match!</title>
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
         
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                           <div style="text-align: left;">
                    <div><img
                        src="https://placehold.co/150x50/cccccc/333333?text=Expander360" alt="Expander360 Logo"
                        style="width: 150px;"></div>
                  </div>
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">Congratulations! A new project awaits.</h1>
                      <p style="padding-bottom: 16px">Hello,</p>
                      <p style="padding-bottom: 16px">A new project, **${projectName}**, has been matched with your company's profile. Log in to your dashboard to review the project details and submit your proposal.</p>
                      <p style="padding-bottom: 16px">This could be the perfect opportunity for you to expand your business.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>The Expander360 Team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                    <p style="padding-bottom: 16px">© Expander360. All Rights Reserved.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>
`,
      },
      recipients: {
        to: newEmail,
      },
    };

    await this.azureConfigService.getEmailClient().beginSend(emailMessage);
  }
}
