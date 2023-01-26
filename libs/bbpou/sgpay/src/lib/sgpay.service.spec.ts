import {Test} from '@nestjs/testing';
import {SgPayService} from './sgpay.service';

describe('BbpouSgpayService', () => {
  let service: SgPayService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SgPayService],
    }).compile();

    service = module.get(SgPayService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
