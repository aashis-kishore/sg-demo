import {Test} from '@nestjs/testing';
import {BillDeskService} from './billdesk.service';

describe('BbpouBilldeskService', () => {
  let service: BillDeskService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BillDeskService],
    }).compile();

    service = module.get(BillDeskService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
