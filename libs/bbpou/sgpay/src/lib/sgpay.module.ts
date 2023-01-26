import {Module} from '@nestjs/common';
import {PayUModule} from '@sg-demo/bbpou/payu';
import {SgPayService} from './sgpay.service';

@Module({
  imports: [PayUModule],
  controllers: [],
  providers: [SgPayService],
  exports: [SgPayService],
})
export class SgPayModule {}
