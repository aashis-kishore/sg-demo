import {Module} from '@nestjs/common';
import {PayUService} from './payu.service';

@Module({
  controllers: [],
  providers: [PayUService],
  exports: [PayUService],
})
export class PayUModule {}
