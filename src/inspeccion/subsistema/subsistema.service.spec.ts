import { Test, TestingModule } from '@nestjs/testing';
import { SubsistemaService } from './subsistema.service';

describe('SubsistemaService', () => {
  let service: SubsistemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsistemaService],
    }).compile();

    service = module.get<SubsistemaService>(SubsistemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
