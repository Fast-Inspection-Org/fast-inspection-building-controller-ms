import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeterioroService } from './tipo-deterioro.service';

describe('TipoDeterioroService', () => {
  let service: TipoDeterioroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoDeterioroService],
    }).compile();

    service = module.get<TipoDeterioroService>(TipoDeterioroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
