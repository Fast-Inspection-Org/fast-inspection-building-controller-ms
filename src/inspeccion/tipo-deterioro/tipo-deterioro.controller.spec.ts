import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeterioroController } from './tipo-deterioro.controller';
import { TipoDeterioroService } from './tipo-deterioro.service';

describe('TipoDeterioroController', () => {
  let controller: TipoDeterioroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDeterioroController],
      providers: [TipoDeterioroService],
    }).compile();

    controller = module.get<TipoDeterioroController>(TipoDeterioroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
