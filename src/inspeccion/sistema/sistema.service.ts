import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { Sistema } from './schemas/sistema.schema';
import { CreateSistemaDTO } from './dto/create-sistema.dto';
import { firstValueFrom } from 'rxjs';
import { Herramienta } from '../herramienta/schemas/herramienta.schema';
import { SubsistemaService } from '../subsistema/subsistema.service';
import { Inspeccion } from '../schemas/inspeccion.schema';
import { SubsistemaSerializable } from '../subsistema/serializable/subsistema.serializable';

@Injectable()
export class SistemaService {
  constructor(
    @Inject(NameConfigsService) private readonly configsClient: ClientProxy,
    private subsistemaService: SubsistemaService,
  ) {}

  // Método para obtener los sistemas configurados para una inspección
  public async getSistemasConfigurados(
    configId: string /* representa el identificador de la configuración seleccionada para la insepeccion */,
    deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */,
    inspeccion: Inspeccion, // la inspección es para poder estructurar la relación birideccional
  ): Promise<Array<Sistema>> {
    const sistemas = new Array<Sistema>();
    // se obtienen los sitemas pertenecientes a la configuración específicada
    const createSistemasDTO: Array<CreateSistemaDTO> = await firstValueFrom(
      this.configsClient.send('getAllBelongConfig', {
        versionConfig: configId,
      }),
    );
    // se estructuran esos sistemas
    console.log(createSistemasDTO)
    for (let index = 0; index < createSistemasDTO.length; index++) {
      const createSistemaDTO = createSistemasDTO[index];
      // se filtran los deterioros pertenecientes a dicho sistema
      const deteriorosSistemas = deteriorosInspeccion.filter(
        (deterioro) => deterioro.sistemaId === createSistemaDTO.id,
      );

      const sistema = new Sistema(
        createSistemaDTO.id,
        createSistemaDTO.nombre,
        new Herramienta(
          createSistemaDTO.herramienta.id,
          createSistemaDTO.herramienta.nombre,
          createSistemaDTO.herramienta.tipo,
        ),
      );
      sistema.subsistemas =
        await this.subsistemaService.getSubsistemasConfigurados(
          createSistemaDTO.id,
          deteriorosSistemas,
          sistema,
          inspeccion,
        ); // se cargan los subsistemas de ese sistema
      sistemas.push(sistema);
    }
    return sistemas;
  }

  // Método para obtener los subsistemas de un sistema especificado
  public async findSubsistemas(sistemaId: string, sistemas: Array<Sistema>) {
    // find the sistema
    const sistema = sistemas.find((sistema) => sistema.id === sistemaId);
    if (sistema)
      // se crean subsistemas serializables
      return sistema.subsistemas.map(
        (subsistema) =>
          new SubsistemaSerializable(
            subsistema.id,
            subsistema.nombre,
            subsistema.indiceCriticidad,
            subsistema.cantDeterioros,
          ),
      );
    else throw new BadRequestException('No existe un sistema con ese id');
  }
  //Método para obtener los materiales de un subsistema especificado
  public async findMateriales(
    sistemaId: string,
    subsistemaId: string,
    sistemas: Array<Sistema>,
  ) {
    // find the sistema
    const sistema = sistemas.find((sistema) => sistema.id === sistemaId);
    if (sistema)
      return this.subsistemaService.finMateriales(
        subsistemaId,
        sistema.subsistemas,
      );
    else throw new BadRequestException('No existe un sistema con ese id');
  }
  // Método para obtener todos los tipos de deterioro de un material específicado
  public async findTiposDeterioros(
    sistemaId: string,
    subsistemaId: string,
    materialId: string,
    sistemas: Array<Sistema>,
  ) {
    // find the sistema
    const sistema = sistemas.find((sistema) => sistema.id === sistemaId);
    if (sistema)
      // se crean subsistemas serializables
      return sistema.subsistemas.map(
        (subsistema) =>
          new SubsistemaSerializable(
            subsistema.id,
            subsistema.nombre,
            subsistema.indiceCriticidad,
            subsistema.cantDeterioros,
          ),
      );
    else throw new BadRequestException('No existe un sistema con ese id');
  }
}
