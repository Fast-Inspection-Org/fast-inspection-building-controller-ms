import { Controller } from '@nestjs/common';
import { DeterioroService } from './deterioro.service';

@Controller('deterioro')
export class DeterioroController {
  constructor(private readonly deterioroService: DeterioroService) {}
}
