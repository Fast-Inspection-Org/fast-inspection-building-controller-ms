import { Test, TestingModule } from '@nestjs/testing';
import { SubsistemaController } from './subsistema.controller';
import { SubsistemaService } from './subsistema.service';

describe('SubsistemaController', () => {
  let controller: SubsistemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsistemaController],
      providers: [SubsistemaService],
    }).compile();

    controller = module.get<SubsistemaController>(SubsistemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
