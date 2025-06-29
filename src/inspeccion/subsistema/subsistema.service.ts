import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { Subsistema } from './schemas/subsistema.schema';
import { firstValueFrom } from 'rxjs';
import { CreateSubsistemaDTO } from './dto/create-subsistema.dto';
import { MaterialService } from '../material/material.service';
import { Sistema } from '../sistema/schemas/sistema.schema';
import { Inspeccion } from '../schemas/inspeccion.schema';
import { MaterialSerializable } from '../material/serializable/material.serializable';

@Injectable()
export class SubsistemaService {
  constructor(
    @Inject(NameConfigsService) private readonly configsClient: ClientProxy,
    private materialService: MaterialService,
  ) {}

  // Método para obtener los subsistemas configurados pertenecientes a un sistema en específico
  public async getSubsistemasConfigurados(
    sistemaId: string /* representa el identificador del sistema la cual pertenecen los subsistemas */,
    deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */,
    sistema: Sistema,
    inspeccion: Inspeccion, // tanto el sistema como la inspección es para poder estructurar la relación bidireccional
  ): Promise<Array<Subsistema>> {
    const subsistemas = new Array<Subsistema>();
    // se obtienen los subsistemas pertenecientes al sistema específicado
    const createSubsistemasDTO: Array<CreateSubsistemaDTO> =
      (await firstValueFrom(
        this.configsClient.send('getAllSubsistemasConfig', {
          idSistemaConfig: sistemaId,
        }),
      )).data
    // se estructuran esos subsistemas
    for (let index = 0; index < createSubsistemasDTO.length; index++) {
      const createSubsistemaDTO = createSubsistemasDTO[index];
      // se filtran solamente los deterioros pertenecientes a dicho subsistema
      const deteriorosSubsistema = deteriorosInspeccion.filter(
        (deterioro) => deterioro.subsistemaId === createSubsistemaDTO.id,
      );

      const subsistema = new Subsistema(
        createSubsistemaDTO.id,
        createSubsistemaDTO.nombre,
      );
      subsistema.materiales =
        await this.materialService.getMaterialesConfigurados(
          createSubsistemaDTO.id,
          deteriorosSubsistema,
          sistema,
          inspeccion,
        ); // se cargan los materiales
      subsistemas.push(subsistema);
    }

    return subsistemas;
  }

  // Método para obtener todos los materiales de un subsistema específicado
  public async finMateriales(
    subsistemaId: string,
    subsistemas: Array<Subsistema>,
  ) {
    // find the subsistema
    const subsistema = subsistemas.find(
      (subsistema) => subsistema.id === subsistemaId,
    );
    if (subsistema)
      // se crean materiales serializables
      return subsistema.materiales.map(
        (material) =>
          new MaterialSerializable(
            material.id,
            material.nombre,
            material.indiceCriticidad,
            material.cantDeterioros,
          ),
      );
    else
      throw new BadRequestException(
        'No existe un subsistema con ese identificador',
      );
  }
  // Método para obtener todos los tipos de deterioro de un material específicado
  public async findTiposDeterioros(
    subsistemaId: string,
    materialId: string,
    subsistemas: Array<Subsistema>,
  ) {
    // find the subsistema
    const subsistema = subsistemas.find(
      (subsistema) => subsistema.id === subsistemaId,
    );
    if (subsistema)
      // se crean materiales serializables
      return subsistema.materiales.map(
        (material) =>
          new MaterialSerializable(
            material.id,
            material.nombre,
            material.indiceCriticidad,
            material.cantDeterioros,
          ),
      );
    else
      throw new BadRequestException(
        'No existe un subsistema con ese identificador',
      );
  }
}
