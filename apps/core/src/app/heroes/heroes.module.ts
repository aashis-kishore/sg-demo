import {Module} from '@nestjs/common';
import {ClientsModule} from '@nestjs/microservices';
import {GrpcReflectionModule} from 'nestjs-grpc-reflection';
import {grpcClientOptions} from '../../grpc-client.options';
// import {ClientsModule, Transport} from '@nestjs/microservices';
// import {join} from 'path';
import {HeroesController} from './heroes.controller';
// import {HeroesService} from './heroes.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
    GrpcReflectionModule.register(grpcClientOptions),
  ],
  controllers: [HeroesController],
  // providers: [HeroesService],
})
export class HeroesModule {}
