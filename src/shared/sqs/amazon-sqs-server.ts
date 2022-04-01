import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Consumer } from 'sqs-consumer';

export class AmazonSQSServer extends Server implements CustomTransportStrategy {
  async listen(callback: () => void) {
    for (const handlers of this.messageHandlers) {
      const [queueName, handleMessageFunction] = handlers;
      const app = Consumer.create({
        queueUrl: `${process.env.SQS}`,
        handleMessage: async (message) => {
          try {
            const messageBody = JSON.parse(message.Body);
            const handled = await handleMessageFunction(messageBody);
            if (handled && handled.subscribe) {
              await lastValueFrom(handled);
            }
          } catch (error) {
            console.log(error);
            throw new Error(error.message);
          }
        },
      });

      app.on('error', (err) => {
        console.error('APP ON ERROR >', err.message);
      });

      app.on('processing_error', (err) => {
        console.error('APP ON PROCESSSING >', err);
      });

      app.on('timeout_error', (err) => {
        console.error(err.message);
      });

      app.start();
    }

    callback();
  }

  close() {
    return null;
  }
}
