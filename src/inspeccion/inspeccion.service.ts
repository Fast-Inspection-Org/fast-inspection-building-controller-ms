import { Inject, Injectable } from '@nestjs/common';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inspeccion } from './schemas/inspeccion.schema';
import { Model } from 'mongoose';
import { NameConfigsService } from 'src/utils/globals';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SistemaService } from './sistema/sistema.service';

@Injectable()
export class InspeccionService {
  constructor(@InjectModel(Inspeccion.name) private inspeccionModel: Model<Inspeccion>,
    @Inject(NameConfigsService) private readonly configsClient: ClientProxy,
    private sistemaService: SistemaService) { }
  public async create(createInspeccionDto: CreateInspeccionDto) {
    // se realiza una estructuración de la inspección

    const inspeccion = new this.inspeccionModel(new Inspeccion(new Date(),
      /* se obtienen los sistemas configurados para dicha inspección*/
      await this.sistemaService.getSistemasConfigurados(createInspeccionDto.configId, createInspeccionDto.deterioros),
      createInspeccionDto.edificacionId, createInspeccionDto.configId))

    // se inserta en la base de datos la insepección
    return await inspeccion.save()
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
