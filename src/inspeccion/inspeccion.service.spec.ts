import { Test, TestingModule } from '@nestjs/testing';
import { InspeccionService } from './inspeccion.service';

describe('InspeccionService', () => {
  let service: InspeccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspeccionService],
    }).compile();

    service = module.get<InspeccionService>(InspeccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
