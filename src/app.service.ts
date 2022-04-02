import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Injectable()
export class AppService {
  constructor(private readonly mailservice: MailService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(data: any): Promise<any> {
    const user = {
      name: 'Matheus Cintra',
      email: 'matheus.cintra18@gmail.com',
    };
    return await this.mailservice.sendConfirmationEmail(user, '12345');
  }
}
