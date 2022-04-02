import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue(process.env.QUEUE_NAME) private readonly mailQueue: Queue,
  ) {}

  async sendConfirmationEmail(user: any, code: string): Promise<boolean> {
    try {
      await this.mailQueue.add('confirmation', {
        user,
        code,
      });
      return true;
    } catch (error) {
      // this.logger.error(`Error queueing confirmation email to user ${user.email}`)
      return false;
    }
  }
}
