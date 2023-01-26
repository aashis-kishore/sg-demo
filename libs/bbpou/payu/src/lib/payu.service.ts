import {Injectable} from '@nestjs/common';
import {BBPOU, BillerCategory} from '@sg-demo/bbpou';
import {Observable} from 'rxjs';

@Injectable()
/**
 * Augmented wrapper for __PayU BBPOU__.
 *
 * @public
 */
export class PayUService implements BBPOU {
  /**
   * Get the complete list all billers by category
   *
   * @param category - Biller category name
   * [click here](/docs/libs/bbpou/enums/BillerCategory.html)
   * @returns All billers of specified `category`
   */
  billersOfCategory(category: BillerCategory): Observable<string[]> {
    if (category === BillerCategory.ELECTRICITY) {
      return new Observable(
          (subscriber) => subscriber.next(['kerala', 'karnataka']),
      );
    }

    return new Observable((subscriber) => subscriber.next(['abc', 'def']));
  }

  fetch(): Observable<void> {
    throw new Error('Method not implemented.');
  }

  payment(): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
