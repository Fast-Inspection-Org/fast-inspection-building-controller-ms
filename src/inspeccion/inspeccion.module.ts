import { Module } from '@nestjs/common';
import { InspeccionService } from './inspeccion.service';
import { InspeccionController } from './inspeccion.controller';
import { SistemaModule } from './sistema/sistema.module';
import { SubsistemaModule } from './subsistema/subsistema.module';
import { MaterialModule } from './material/material.module';
import { DeterioroModule } from './deterioro/deterioro.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Inspeccion, InspeccionSchema } from './schemas/inspeccion.schema';
import { TipoDeterioroModule } from './tipo-deterioro/tipo-deterioro.module';
import { TipoDeterioroAnalisisCriticidadModule } from './tipo-deterioro-analisis-criticidad/tipo-deterioro-analisis-criticidad.module';

@Module({
  controllers: [InspeccionController],
  providers: [InspeccionService],
  imports: [SistemaModule, SubsistemaModule, MaterialModule, DeterioroModule, MongooseModule.forFeature([
    {
      name: Inspeccion.name,
      schema: InspeccionSchema
    }
  ]), TipoDeterioroModule, TipoDeterioroAnalisisCriticidadModule],
  exports: [InspeccionService]
})
export class InspeccionModule { }
