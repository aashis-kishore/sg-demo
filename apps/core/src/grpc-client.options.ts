import {GrpcOptions, Transport} from '@nestjs/microservices';
import {addReflectionToGrpcConfig} from 'nestjs-grpc-reflection';
import {dirname, join} from 'path';

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(dirname(__filename), 'assets/hero/hero.proto'),
    url: '0.0.0.0:5000',
  },
});
