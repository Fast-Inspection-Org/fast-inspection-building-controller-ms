import { Inject, Injectable } from '@nestjs/common';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NameConfigsService } from 'src/utils/globals';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SistemaService } from './sistema/sistema.service';
import { Inspeccion } from './schemas/inspeccion.schema';

@Injectable()
export class InspeccionService {
  constructor(@InjectModel(Inspeccion.name) private inspeccionModel: Model<Inspeccion>,
    @Inject(NameConfigsService) private readonly configsClient: ClientProxy,
    private sistemaService: SistemaService) { }
  public async create(createInspeccionDto: CreateInspeccionDto) {
    // se realiza una estructuración de la inspección
    const inspeccion = new Inspeccion(new Date(),
      createInspeccionDto.edificacionId, createInspeccionDto.configId)
    //se obtienen los sistemas configurados para dicha inspección
    inspeccion.sistemas = await this.sistemaService.getSistemasConfigurados(createInspeccionDto.configId, createInspeccionDto.deterioros, inspeccion)
    // se realizan los cálculos
    await inspeccion.realizarCalculos()
    const inspeccionSchema = new this.inspeccionModel(inspeccion)

    // se inserta en la base de datos la insepección
    return await inspeccionSchema.save()
  }

  public async findAll() {
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
