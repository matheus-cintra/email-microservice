import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

class User {
  name: string;
  email: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(user: any, code: string): Promise<boolean> {
    this.logger.log(`Sending confirmation email to '${user.email}'`);

    const url = `http://localhost:3000/auth/${code}/confirm`;

    const result = await this.mailerService.sendMail({
      template: 'confirmation',
      context: {
        ...plainToInstance(User, user),
        url: url,
      },
      subject: `Welcome to appointments service! Please Confirm Your Email Address`,
      to: user.email,
    });
    return result;
  }
}
