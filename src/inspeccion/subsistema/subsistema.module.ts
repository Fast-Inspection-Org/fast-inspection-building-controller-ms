import { Module } from '@nestjs/common';
import { SubsistemaService } from './subsistema.service';
import { SubsistemaController } from './subsistema.controller';

@Module({
  controllers: [SubsistemaController],
  providers: [SubsistemaService],
})
export class SubsistemaModule {}
