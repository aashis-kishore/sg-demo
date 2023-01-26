import {Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class HeroesService {
  findOne(heroById: { id: number }): Observable<string> {
    return new Observable((subscriber) => subscriber.next('tough tiger'));
  }
}
