import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeterioroAnalisisCriticidadService } from './tipo-deterioro-analisis-criticidad.service';

describe('TipoDeterioroAnalisisCriticidadService', () => {
  let service: TipoDeterioroAnalisisCriticidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoDeterioroAnalisisCriticidadService],
    }).compile();

    service = module.get<TipoDeterioroAnalisisCriticidadService>(TipoDeterioroAnalisisCriticidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
