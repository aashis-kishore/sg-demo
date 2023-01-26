import {Injectable} from '@nestjs/common';
import {BBPOU, BillerCategory} from '@sg-demo/bbpou';
import {PayUService} from '@sg-demo/bbpou/payu';
import {Observable} from 'rxjs';

@Injectable()
export class SgPayService implements BBPOU {
  constructor(private readonly payuService: PayUService) {}

  billersOfCategory(category: BillerCategory): Observable<string[]> {
    return this.payuService.billersOfCategory(category);
  }
  fetch(): Observable<void> {
    throw new Error('Method not implemented.');
  }
  payment(): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
