import { Injectable } from '@nestjs/common';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inspeccion } from './schemas/inspeccion.schema';
import { Model } from 'mongoose';

@Injectable()
export class InspeccionService {
  constructor(@InjectModel(Inspeccion.name) private inspeccionModel: Model<Inspeccion>) { }
  public async create(createInspeccionDto: CreateInspeccionDto) {
    // se realiza una estructuración de la inspección
    
    const inspeccion = new this.inspeccionModel(createInspeccionDto)

    // se inserta en la base de datos la insepección
    await inspeccion.save()
  }

  findAll() {
    return `This action returns all inspeccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inspeccion`;
  }

  update(id: number, updateInspeccionDto: UpdateInspeccionDto) {
    return `This action updates a #${id} inspeccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} inspeccion`;
  }
}
