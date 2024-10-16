import { Test, TestingModule } from '@nestjs/testing';
import { InspeccionController } from './inspeccion.controller';
import { InspeccionService } from './inspeccion.service';

describe('InspeccionController', () => {
  let controller: InspeccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspeccionController],
      providers: [InspeccionService],
    }).compile();

    controller = module.get<InspeccionController>(InspeccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
