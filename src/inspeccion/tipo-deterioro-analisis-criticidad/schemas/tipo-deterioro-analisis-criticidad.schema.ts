import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Deterioro } from "src/inspeccion/deterioro/schemas/deterioro.schema";
import { Sistema } from "src/inspeccion/sistema/schemas/sistema.schema";
import { TipoDeterioro } from "src/inspeccion/tipo-deterioro/schemas/tipo-deterioro.schema";
import { TipoDeterioroAnalisisCriticidadService } from "../tipo-deterioro-analisis-criticidad.service";
import { InspeccionService } from "src/inspeccion/inspeccion.service";
import { Inspeccion } from "src/inspeccion/schemas/inspeccion.schema";
import { Calculos } from "src/utils/interfaces";
import { Campo, CampoSchema } from "src/inspeccion/campo/schemas/campo.schema";
import { CreateIndicadorDTO } from "src/inspeccion/indicador/dto/create-indicador.dto";
import { Indicador } from "src/inspeccion/indicador/shcemas/indicador.schema";

@Schema()
export class TipoDeterioroAnalisisCriticidad extends TipoDeterioro {
    @Prop()
    detectabilidad: number
    @Prop({ type: [CampoSchema] })
    camposAfectados: Array<Campo>
    sistema: Sistema // virtual property
    inspeccion: Inspeccion // virtual property
    tipoDeterioroAnalisisCriticidadService: TipoDeterioroAnalisisCriticidadService // virtual property

    constructor(id: string, nombre: string, deterioros: Array<Deterioro>, sistema: Sistema, inspeccion: Inspeccion,
        tipoDeterioroAnalisisCriticidadService: TipoDeterioroAnalisisCriticidadService, detectabilidad: number, camposAfectados: Array<Campo>) {
        super(id, nombre, deterioros)
        this.sistema = sistema
        this.inspeccion = inspeccion
        this.tipoDeterioroAnalisisCriticidadService = tipoDeterioroAnalisisCriticidadService
        this.detectabilidad = detectabilidad
        this.camposAfectados = camposAfectados
    }

    public async calcularIndiceCriticidad(): Promise<number> {
        // se obtienen el indicador de criticidad mediante la fórmula de criticidad
        const criticidad = (await this.getIndiceFrecuencia()).valor * (await this.getIndiceImpacto()).valor * (await this.getIndiceDetectabilidad()).valor
        const indiceProgramado = await this.tipoDeterioroAnalisisCriticidadService.getIndiceProgramado(this.inspeccion.configVersion, Calculos.Criticidad,
            criticidad)
        console.log(indiceProgramado)
        this.indiceCriticidad = new Indicador(indiceProgramado.id, indiceProgramado.nombre, indiceProgramado.valor) // se almacena el cálculo para la serialización

        return this.indiceCriticidad.valor
    }

    private async getIndiceFrecuencia(): Promise<CreateIndicadorDTO> {
        // se determina el porcentaje de ocurrencia de este tipo de deterioro respecto al total de lesiones en el sistema
        const totalDeteriorosSistema = this.sistema.getCantDeterioros()  // se obtiene el total de deterioros del sistema
        const porcentajeOcurrencia = totalDeteriorosSistema > 0 ? this.getCantDeterioros() * 100.0 / totalDeteriorosSistema : 0
        // se realiza una petición para obtener el indice de frecuencia programado
        return porcentajeOcurrencia > 0 ? await this.tipoDeterioroAnalisisCriticidadService.getIndiceProgramado(this.inspeccion.configVersion, Calculos.Frecuencia, porcentajeOcurrencia) : {
            id: 0,
            nombre: "Sin indice de frecuencia",
            valor: 0
        }
    }

    private async getIndiceDetectabilidad(): Promise<CreateIndicadorDTO> {
        return await this.tipoDeterioroAnalisisCriticidadService.getIndiceProgramado(this.inspeccion.configVersion, Calculos.Detectabilidad, this.detectabilidad)
    }

    private async getIndiceImpacto() {
        // se ejecuta el cálculo del impácto
        let impacto = 0
        // se realiza la sumatoria de las importancias
        this.camposAfectados.forEach((campoAfectado) => {
            impacto += campoAfectado.nivelImportancia
        })

        return impacto > 0 ? await this.tipoDeterioroAnalisisCriticidadService.getIndiceProgramado(this.inspeccion.configVersion, Calculos.Impacto, impacto) : {
            id: 0,
            nombre: "Sin indice de impacto",
            valor: 0
        }
    }
}

export const TipoDeterioroAnalisisCriticidadSchema = SchemaFactory.createForClass(TipoDeterioroAnalisisCriticidad)