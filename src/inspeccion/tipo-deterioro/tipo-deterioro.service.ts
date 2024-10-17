import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { TipoDeterioro } from './schemas/tipo-deterioro.schema';
import { TipoDeterioroAnalisisCriticidadService } from '../tipo-deterioro-analisis-criticidad/tipo-deterioro-analisis-criticidad.service';

@Injectable()
export class TipoDeterioroService {
    constructor(private tipoDeterioroAnalisisCriticidadService: TipoDeterioroAnalisisCriticidadService) { }

    // Método para obtener los tipos de deterioro configurados pertenecientes a un material en específico
    public async getTiposDeteriorosConfigurados(materialId: string /* representa el identificador del material la cual pertenecen los tipos de deterioro */,
        deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */
    ): Promise<Array<TipoDeterioro>> {
        const tiposDeterioros = new Array<TipoDeterioro>()
        // se llaman a cada servicio correspondiente para obtener los tipos de deterioro de cada tipo
        tiposDeterioros.push(...(await this.tipoDeterioroAnalisisCriticidadService.getTiposDeteriorosAnalisisCriticidadConfigurados(materialId, deteriorosInspeccion)))

        return tiposDeterioros
    }

}
