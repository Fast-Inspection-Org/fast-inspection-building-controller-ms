import { Controller } from '@nestjs/common';
import { TipoDeterioroService } from './tipo-deterioro.service';

@Controller('tipo-deterioro')
export class TipoDeterioroController {
  constructor(private readonly tipoDeterioroService: TipoDeterioroService) {}
}
