import { Module } from '@nestjs/common';
import { DeterioroService } from './deterioro.service';
import { DeterioroController } from './deterioro.controller';

@Module({
  controllers: [DeterioroController],
  providers: [DeterioroService],
})
export class DeterioroModule {}
