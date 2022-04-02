import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('email')
  async notificate(@Payload() data: any): Promise<any> {
    this.appService.sendEmail(data);
  }
}
