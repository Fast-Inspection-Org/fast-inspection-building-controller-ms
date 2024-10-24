import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NameConfigsService } from 'src/utils/globals';
import { CreateDeterioroDTO } from '../deterioro/dto/create-deterioro.dto';
import { Sistema } from './schemas/sistema.schema';
import { CreateSistemaDTO } from './dto/create-sistema.dto';
import { firstValueFrom } from 'rxjs';
import { Herramienta } from '../herramienta/schemas/herramienta.schema';
import { SubsistemaService } from '../subsistema/subsistema.service';
import { Inspeccion } from '../schemas/inspeccion.schema';

@Injectable()
export class SistemaService {
    constructor(@Inject(NameConfigsService) private readonly configsClient: ClientProxy,
        private subsistemaService: SubsistemaService) { }

    // Método para obtener los sistemas configurados para una inspección
    public async getSistemasConfigurados(configId: string /* representa el identificador de la configuración seleccionada para la insepeccion */,
        deteriorosInspeccion: Array<CreateDeterioroDTO> /* representa los deterioros indentificados en la inspección */,
        inspeccion: Inspeccion // la inspección es para poder estructurar la relación birideccional
    ): Promise<Array<Sistema>> {
        const sistemas = new Array<Sistema>()
        // se obtienen los sitemas pertenecientes a la configuración específicada
        const createSistemasDTO: Array<CreateSistemaDTO> = await firstValueFrom(this.configsClient.send('getAllBelongConfig', {
            versionConfig: configId
        }))
        // se estructuran esos sistemas

        for (let index = 0; index < createSistemasDTO.length; index++) {
            const createSistemaDTO = createSistemasDTO[index];
            // se filtran los deterioros pertenecientes a dicho sistema
            const deteriorosSistemas = deteriorosInspeccion.filter(deterioro => deterioro.sistemaId === createSistemaDTO.id)

            const sistema = new Sistema(createSistemaDTO.id, createSistemaDTO.nombre,
                new Herramienta(createSistemaDTO.herramienta.id, createSistemaDTO.herramienta.nombre, createSistemaDTO.herramienta.tipo))
            sistema.subsistemas = await this.subsistemaService.getSubsistemasConfigurados(createSistemaDTO.id, deteriorosSistemas, sistema, inspeccion) // se cargan los subsistemas de ese sistema
            sistemas.push(sistema)
        }
        return sistemas
    }
}
