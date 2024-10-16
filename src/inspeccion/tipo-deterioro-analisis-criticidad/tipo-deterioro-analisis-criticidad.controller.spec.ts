import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeterioroAnalisisCriticidadController } from './tipo-deterioro-analisis-criticidad.controller';
import { TipoDeterioroAnalisisCriticidadService } from './tipo-deterioro-analisis-criticidad.service';

describe('TipoDeterioroAnalisisCriticidadController', () => {
  let controller: TipoDeterioroAnalisisCriticidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDeterioroAnalisisCriticidadController],
      providers: [TipoDeterioroAnalisisCriticidadService],
    }).compile();

    controller = module.get<TipoDeterioroAnalisisCriticidadController>(TipoDeterioroAnalisisCriticidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
