import { Module } from '@nestjs/common';
import { InspeccionService } from './inspeccion.service';
import { InspeccionController } from './inspeccion.controller';
import { DeterioroModule } from './deterioro/deterioro.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Inspeccion, InspeccionSchema } from './schemas/inspeccion.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/utils/envs';
import { NameConfigsService } from 'src/utils/globals';
import { SistemaService } from './sistema/sistema.service';
import { SubsistemaService } from './subsistema/subsistema.service';
import { MaterialService } from './material/material.service';
import { TipoDeterioroService } from './tipo-deterioro/tipo-deterioro.service';
import { TipoDeterioroAnalisisCriticidadService } from './tipo-deterioro-analisis-criticidad/tipo-deterioro-analisis-criticidad.service';

@Module({
  controllers: [InspeccionController],
  providers: [InspeccionService, SistemaService, SubsistemaService, MaterialService, TipoDeterioroService, TipoDeterioroAnalisisCriticidadService],
  imports: [DeterioroModule, MongooseModule.forFeature([
    {
      name: Inspeccion.name,
      schema: InspeccionSchema
    }
  ]),
    ClientsModule.register([
      {
        name: NameConfigsService,
        transport: Transport.TCP,
        options: {
          host: envs.CONFIGS_SERVICE_HOST,
          port: parseInt(envs.CONFIGS_SERVICE_PORT)
        }
      }
    ])],
  exports: [InspeccionService]
})
export class InspeccionModule { }
