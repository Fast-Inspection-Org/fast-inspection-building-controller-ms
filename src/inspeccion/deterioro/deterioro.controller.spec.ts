import { Test, TestingModule } from '@nestjs/testing';
import { DeterioroController } from './deterioro.controller';
import { DeterioroService } from './deterioro.service';

describe('DeterioroController', () => {
  let controller: DeterioroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeterioroController],
      providers: [DeterioroService],
    }).compile();

    controller = module.get<DeterioroController>(DeterioroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
