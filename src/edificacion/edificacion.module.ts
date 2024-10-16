import { Module } from '@nestjs/common';
import { EdificacionService } from './edificacion.service';
import { EdificacionController } from './edificacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Edificacion, EdificacionSchema } from './schemas/edificacion.schemas';
import { InspeccionModule } from 'src/inspeccion/inspeccion.module';

@Module({
  imports: [InspeccionModule, MongooseModule.forFeature([
    {
      name: Edificacion.name,
      schema: EdificacionSchema
    }
  ])],
  controllers: [EdificacionController],
  providers: [EdificacionService],
})
export class EdificacionModule { }
