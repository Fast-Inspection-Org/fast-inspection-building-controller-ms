import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdificacionModule } from './edificacion/edificacion.module';
import { InspeccionModule } from './inspeccion/inspeccion.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
    ),
    EdificacionModule,
    InspeccionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
