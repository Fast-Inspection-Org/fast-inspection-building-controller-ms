import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdificacionModule } from './edificacion/edificacion.module';
import { InspeccionModule } from './inspeccion/inspeccion.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './utils/envs';

@Module({
  imports: [EdificacionModule, InspeccionModule, MongooseModule.forRoot(`mongodb://localhost/${envs.NAME_DB}`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
