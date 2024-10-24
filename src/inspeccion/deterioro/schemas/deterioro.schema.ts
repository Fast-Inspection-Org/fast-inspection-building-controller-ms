import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CampoDefinido, CampoDefinidoSchema } from "src/inspeccion/campo-definido/schema/campo-definido.schema";


@Schema()
export class Deterioro {
    @Prop()
    codigo: string
    @Prop({ type: [CampoDefinidoSchema] })
    camposDefinidos: Array<CampoDefinido>

    constructor(codigo: string, camposDefinidos: Array<CampoDefinido>) {
        this.codigo = codigo
        this.camposDefinidos = camposDefinidos
    }
}

export const DeterioroSchema = SchemaFactory.createForClass(Deterioro)