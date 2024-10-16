import { Controller } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadService } from './tipo-deterioro-analisis-criticidad.service';

@Controller('tipo-deterioro-analisis-criticidad')
export class TipoDeterioroAnalisisCriticidadController {
  constructor(private readonly tipoDeterioroAnalisisCriticidadService: TipoDeterioroAnalisisCriticidadService) {}
}
