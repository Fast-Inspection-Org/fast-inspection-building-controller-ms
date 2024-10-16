import { Controller } from '@nestjs/common';
import { SistemaService } from './sistema.service';

@Controller('sistema')
export class SistemaController {
  constructor(private readonly sistemaService: SistemaService) {}
}
