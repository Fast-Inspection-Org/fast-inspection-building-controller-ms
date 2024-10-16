import { Module } from '@nestjs/common';
import { TipoDeterioroService } from './tipo-deterioro.service';
import { TipoDeterioroController } from './tipo-deterioro.controller';

@Module({
  controllers: [TipoDeterioroController],
  providers: [TipoDeterioroService],
})
export class TipoDeterioroModule {}
