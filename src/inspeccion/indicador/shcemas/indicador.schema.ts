import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Indicador {
    @Prop()
    id: number
    @Prop()
    nombre: string
    @Prop()
    valor: number

    constructor(id: number, nombre: string, valor: number) {
        this.id = id
        this.nombre = nombre
        this.valor = valor
    }
}

export const IndicadorSchema = SchemaFactory.createForClass(Indicador)