import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions} from '@nestjs/microservices';
import * as compression from 'compression';
import helmet from 'helmet';

import {AppModule} from './app/app.module';
import {grpcClientOptions} from './grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  app.use(compression());
  app.use(helmet({
    contentSecurityPolicy:
      configService.get<string>('NODE_ENV') === 'production',
  }));

  await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
