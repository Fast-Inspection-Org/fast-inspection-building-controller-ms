import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { Material } from './schemas/material.schema';
import { firstValueFrom } from 'rxjs';
import { CreateMaterialDTO } from './dto/create-material.dto';
import { TipoDeterioroService } from '../tipo-deterioro/tipo-deterioro.service';

@Injectable()
export class MaterialService {
    constructor(@Inject(NameConfigsService) private readonly configsClient: ClientProxy,
        private tipoDeterioroService: TipoDeterioroService) { }

    // Método para obtener los materiales configurados pertenecientes a un subsistema en específico
    public async getMaterialesConfigurados(subsistemaId: string /* representa el identificador del subsistema la cual pertenecen los materiales */,
        deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */
    ): Promise<Array<Material>> {
        const materiales = new Array<Material>()
        // se obtienen los materiales pertenecientes al subsistema específicado
        const createMaterialesDTO: Array<CreateMaterialDTO> = await firstValueFrom(this.configsClient.send('getAllMaterialesConfig', {
            idSubsistemaConfig: subsistemaId
        }))
        // se estructuran esos subsistemas
        for (let index = 0; index < createMaterialesDTO.length; index++) {
            const createMaterialDTO = createMaterialesDTO[index];
            // se filtran solamente los deterioros pertenecientes a dicho material
            const deteriorosMaterial = deteriorosInspeccion.filter(deterioro => deterioro.materialId === createMaterialDTO.id)
            materiales.push(new Material(createMaterialDTO.id, createMaterialDTO.nombre,
                await this.tipoDeterioroService.getTiposDeteriorosConfigurados(createMaterialDTO.id, deteriorosMaterial)))
        }

        return materiales
    }
}
