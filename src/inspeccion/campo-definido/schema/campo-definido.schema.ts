import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export enum TiposCampo {
    Numerico = "Numérico"
}

@Schema()
export class CampoDefinido {
    @Prop()
    nombre: string
    @Prop()
    tipo: TiposCampo
    @Prop()
    valor: string // representa el valor seleccionado para dicho campo

    constructor(
        nombre: string,
        tipo: TiposCampo,
        valor: string // representa el valor seleccionado para dicho campo
    ) {
        this.nombre = nombre
        this.tipo = tipo
        this.valor = valor
    }
}

export const CampoDefinidoSchema = SchemaFactory.createForClass(CampoDefinido)