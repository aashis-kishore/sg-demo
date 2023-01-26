import {Test} from '@nestjs/testing';
import {PayUService} from './payu.service';

describe('BbpouPayuService', () => {
  let service: PayUService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PayUService],
    }).compile();

    service = module.get(PayUService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
