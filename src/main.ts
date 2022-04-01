import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AmazonSQSServer } from './shared/sqs/amazon-sqs-server';

async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.create(AppModule, { cors: true });

  const appMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      strategy: new AmazonSQSServer(),
    });

  appMicroservice.listen();
  await app.listen(3002);
}
bootstrap();
