import { Deterioro } from "src/inspeccion/deterioro/schemas/deterioro.schema";
import { TipoDeterioro } from "src/inspeccion/tipo-deterioro/schemas/tipo-deterioro.schema";

export class TipoDeterioroAnalisisCriticidad extends TipoDeterioro {
    constructor(id: string, nombre: string, deterioros: Array<Deterioro>) {
        super(id, nombre, deterioros)
    }
}