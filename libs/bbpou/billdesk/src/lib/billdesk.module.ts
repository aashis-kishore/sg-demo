import {Module} from '@nestjs/common';
import {BillDeskService} from './billdesk.service';

@Module({
  controllers: [],
  providers: [BillDeskService],
  exports: [BillDeskService],
})
export class BillDeskModule {}
