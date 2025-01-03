import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './utils/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(envs.PORT)
      }
    },
  );
  await app.listen();
}
bootstrap();
