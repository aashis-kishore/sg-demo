import {HttpService} from '@nestjs/axios';
import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {BillerCategory} from '@sg-demo/bbpou';
import {SgPayService} from '@sg-demo/bbpou/sgpay';
import {Cache} from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    private readonly sgPayService: SgPayService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  getData(): { message: string } {
    const name = this.configService.get<string>('NAME');

    console.log('name: ', name);

    this.sgPayService.billersOfCategory(BillerCategory.ELECTRICITY)
        .subscribe((x) => console.log(x));

    return {message: 'Welcome to core!'};
  }
}
