import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Sistema, SistemaSchema } from "../sistema/schemas/sistema.schema";


@Schema()
export class Inspeccion {
    @Prop()
    fechaInicio: Date // representa la fecha de inicio de la inspección
    @Prop({ type: [SistemaSchema] })
    sistemas: Array<Sistema>
    @Prop()
    edificacionId: string // identificador de la edificación a la cual pertenece dicha inspección
    @Prop()
    configVersion: string // indentificador de la configuración con la cual fue realizada la inspección
    @Prop()
    indiceCriticidad: number
    @Prop()
    cantDeterioros: number


    constructor(fechaInicio: Date, edificacionId: string, configVersion: string) {
        this.fechaInicio = fechaInicio
        this.edificacionId = edificacionId
        this.configVersion = configVersion
        this.indiceCriticidad = 0
        this.cantDeterioros = 0

    }

    public async realizarCalculos() {
        // se ejecuta el cálculo del índice de críticidad
        await this.calcularIndiceCriticidad()
        // se ejecuta el cálculo de la cantidad de deterioros
        this.calcularCantDeterioros()
    }

    private async calcularIndiceCriticidad() {
        let cant = 0
        for (let index = 0; index < this.sistemas.length; index++) {
            const sistema = this.sistemas[index];
            cant += await sistema.calcularIndiceCriticidad()
        }

        this.indiceCriticidad = cant // se almacena el cálculo para su serialziación

        return this.indiceCriticidad
    }

    private calcularCantDeterioros() {
        this.sistemas.forEach((sistema) => {
            this.cantDeterioros += sistema.calcularCantDeterioros() // se alameca el cálculo para su serialización
        })
    }
}


export const InspeccionSchema = SchemaFactory.createForClass(Inspeccion)
