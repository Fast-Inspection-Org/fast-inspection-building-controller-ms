import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { TipoDeterioroAnalisisCriticidad } from './schemas/tipo-deterioro-analisis-criticidad.schema';
import { firstValueFrom } from 'rxjs';
import { CreateTipoDeterioroAnalisisCriticidadDTO } from './dto/create-tipo-deterioro-analisis-criticidad.dto';
import { Deterioro } from '../deterioro/schemas/deterioro.schema';
import { Sistema } from '../sistema/schemas/sistema.schema';
import { Inspeccion } from '../schemas/inspeccion.schema';
import { Calculos } from 'src/utils/interfaces';
import { CreateIndicadorDTO } from '../indicador/dto/create-indicador.dto';

@Injectable()
export class TipoDeterioroAnalisisCriticidadService {
  constructor(
    @Inject(NameConfigsService) private readonly configsClient: ClientProxy,
  ) {}

  // Método para obtener los tipos de deterioro analisis criticidad configurados pertenecientes a un material en específico
  public async getTiposDeteriorosAnalisisCriticidadConfigurados(
    materialId: string /* representa el identificador del material la cual pertenecen los tipos de deterioro */,
    deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */,
    sistema: Sistema,
    inspeccion: Inspeccion, // tanto el sistema como la inspección es para poder estructurar la relación bidireccional
  ): Promise<Array<TipoDeterioroAnalisisCriticidad>> {
    const tiposDeteriorosAnalisisCriticidad =
      new Array<TipoDeterioroAnalisisCriticidad>();
    // se obtienen los tipos de deterioro pertenecientes al material específicado
    const createTiposDeteriorosAnalisisCriticidadDTO: Array<CreateTipoDeterioroAnalisisCriticidadDTO> =
      await firstValueFrom(
        this.configsClient.send(
          'getAllTiposDeteriorosAnalisisCriticidadConfig',
          {
            idMaterialConfig: materialId,
            withCamposAfectados: true, // se indica que se desean obtener los tipos de deterioros con los campos
          },
        ),
      );

    // se estructuran esos subsistemas
    for (
      let index = 0;
      index < createTiposDeteriorosAnalisisCriticidadDTO.length;
      index++
    ) {
      const createTipoDeterioroAnalisisCriticidadDTO =
        createTiposDeteriorosAnalisisCriticidadDTO[index];
      // se filtran y se crean los deterioros pertenecientes a dicho tipo de deterioro
      const deteriorosTipoDeterioro: Array<Deterioro> =
        (function (): Array<Deterioro> {
          // se filtran los deterioros y se crean deterioros schemas
          const deteriorosSchemas = new Array<Deterioro>();
          deteriorosInspeccion.forEach((deterioroInspeccion) => {
            if (
              deterioroInspeccion.tipoDeterioroId ===
              createTipoDeterioroAnalisisCriticidadDTO.id
            )
              // si es un deterioro de dicho tipo de deterioro
              deteriorosSchemas.push(
                new Deterioro(
                  deterioroInspeccion.codigo,
                  deterioroInspeccion.campos,
                ),
              );
          });

          return deteriorosSchemas;
        })();

      const tipoDeterioro = new TipoDeterioroAnalisisCriticidad(
        createTipoDeterioroAnalisisCriticidadDTO.id,
        createTipoDeterioroAnalisisCriticidadDTO.nombre,
        deteriorosTipoDeterioro,
        sistema,
        this,
        createTipoDeterioroAnalisisCriticidadDTO.detectabilidad,
        createTipoDeterioroAnalisisCriticidadDTO.camposAfectados,
      );
      // asignar antes inspeccion
      tipoDeterioro.inspeccion = inspeccion;
      tiposDeteriorosAnalisisCriticidad.push(tipoDeterioro);
    }

    return tiposDeteriorosAnalisisCriticidad;
  }

  // Método para obtener un índice programado dado el cálculo y el valor
  public async getIndiceProgramado(
    configVersion: string,
    calculo: Calculos,
    valor: number,
  ): Promise<CreateIndicadorDTO> {
    return await firstValueFrom(
      this.configsClient.send('getIndicadorCalculo', {
        version: configVersion,
        valorCalculo: valor,
        calculo: calculo,
      }),
    );
  }
}
