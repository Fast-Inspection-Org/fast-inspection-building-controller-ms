import { Module } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadService } from './tipo-deterioro-analisis-criticidad.service';
import { TipoDeterioroAnalisisCriticidadController } from './tipo-deterioro-analisis-criticidad.controller';

@Module({
  controllers: [TipoDeterioroAnalisisCriticidadController],
  providers: [TipoDeterioroAnalisisCriticidadService],
})
export class TipoDeterioroAnalisisCriticidadModule {}
