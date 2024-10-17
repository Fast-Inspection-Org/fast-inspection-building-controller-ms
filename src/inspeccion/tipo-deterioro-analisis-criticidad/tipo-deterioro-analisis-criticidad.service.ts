import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { TipoDeterioroAnalisisCriticidad } from './schemas/tipo-deterioro-analisis-criticidad.schema';
import { firstValueFrom } from 'rxjs';
import { CreateTipoDeterioroAnalisisCriticidadDTO } from './dto/create-tipo-deterioro-analisis-criticidad.dto';
import { Deterioro } from '../deterioro/schemas/deterioro.schema';

@Injectable()
export class TipoDeterioroAnalisisCriticidadService {
    constructor(@Inject(NameConfigsService) private readonly configsClient: ClientProxy) { }

    // Método para obtener los tipos de deterioro analisis criticidad configurados pertenecientes a un material en específico
    public async getTiposDeteriorosAnalisisCriticidadConfigurados(materialId: string /* representa el identificador del material la cual pertenecen los tipos de deterioro */,
        deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */
    ): Promise<Array<TipoDeterioroAnalisisCriticidad>> {
        const tiposDeteriorosAnalisisCriticidad = new Array<TipoDeterioroAnalisisCriticidad>()
        // se obtienen los tipos de deterioro pertenecientes al material específicado
        const createTiposDeteriorosAnalisisCriticidadDTO: Array<CreateTipoDeterioroAnalisisCriticidadDTO> =
            await firstValueFrom(this.configsClient.send('getAllTiposDeteriorosAnalisisCriticidadConfig', {
                idMaterialConfig: materialId
            }))
        // se estructuran esos subsistemas
        for (let index = 0; index < createTiposDeteriorosAnalisisCriticidadDTO.length; index++) {
            const createTipoDeterioroAnalisisCriticidadDTO = createTiposDeteriorosAnalisisCriticidadDTO[index];
            // se filtran y se crean los deterioros pertenecientes a dicho tipo de deterioro
            const deteriorosTipoDeterioro = deteriorosInspeccion.map((deterioro) => {
                if (deterioro.tipoDeterioroId === createTipoDeterioroAnalisisCriticidadDTO.id)
                    return new Deterioro(deterioro.codigo, deterioro.campos)
            })
            tiposDeteriorosAnalisisCriticidad.push(new TipoDeterioroAnalisisCriticidad(createTipoDeterioroAnalisisCriticidadDTO.id, createTipoDeterioroAnalisisCriticidadDTO.nombre, deteriorosTipoDeterioro))
        }

        return tiposDeteriorosAnalisisCriticidad
    }
}
