import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Sistema } from "../sistema/schemas/sistema.schema";

@Schema()
export class Inspeccion {
    @Prop()
    fechaInicio: Date // representa la fecha de inicio de la inspección
    @Prop()
    sistemas: Array<Sistema>
    @Prop()
    edificacionId: string // identificador de la edificación a la cual pertenece dicha inspección
    @Prop()
    configId: string // indentificador de la configuración con la cual fue realizada la inspección

    constructor(fechaInicio: Date, sistemas: Array<Sistema>, edificacionId: string, configId: string) {
        this.fechaInicio = fechaInicio
        this.sistemas = sistemas
        this.edificacionId = edificacionId
        this.configId = configId
    }
}


export const InspeccionSchema = SchemaFactory.createForClass(Inspeccion)
