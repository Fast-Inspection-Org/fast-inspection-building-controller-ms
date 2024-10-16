import { Schema } from "@nestjs/mongoose";
import { Campo } from "src/inspeccion/campo/schema/campo.schema";

@Schema()
export class Deterioro {
    codigo: string
    campos: Array<Campo>

    constructor(codigo: string, campos: Array<Campo>) {
        this.codigo = codigo
        this.campos = campos
    }
}