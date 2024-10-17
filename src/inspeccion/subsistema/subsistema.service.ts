import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { Subsistema } from './schemas/subsistema.schema';
import { firstValueFrom } from 'rxjs';
import { CreateSubsistemaDTO } from './dto/create-subsistema.dto';
import { MaterialService } from '../material/material.service';

@Injectable()
export class SubsistemaService {
    constructor(@Inject(NameConfigsService) private readonly configsClient: ClientProxy,
        private materialService: MaterialService) { }

    // Método para obtener los subsistemas configurados pertenecientes a un sistema en específico
    public async getSubsistemasConfigurados(sistemaId: string /* representa el identificador del sistema la cual pertenecen los subsistemas */,
        deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */
    ): Promise<Array<Subsistema>> {
        const subsistemas = new Array<Subsistema>()
        // se obtienen los subsistemas pertenecientes al sistema específicado
        const createSubsistemasDTO: Array<CreateSubsistemaDTO> = await firstValueFrom(this.configsClient.send('getAllSubsistemasConfig', {
            idSistemaConfig: sistemaId
        }))
        // se estructuran esos subsistemas
        for (let index = 0; index < createSubsistemasDTO.length; index++) {
            const createSubsistemaDTO = createSubsistemasDTO[index];
            // se filtran solamente los deterioros pertenecientes a dicho subsistema
            const deteriorosSubsistema = deteriorosInspeccion.filter(deterioro => deterioro.subsistemaId === createSubsistemaDTO.id)
            subsistemas.push(new Subsistema(createSubsistemaDTO.id, createSubsistemaDTO.nombre,
                await this.materialService.getMaterialesConfigurados(createSubsistemaDTO.id, deteriorosSubsistema)))
        }

        return subsistemas
    }
}
