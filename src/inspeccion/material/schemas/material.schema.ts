import { Deterioro } from "src/inspeccion/deterioro/schemas/deterioro.schema"
import { TipoDeterioro } from "src/inspeccion/tipo-deterioro/schemas/tipo-deterioro.schema"

export class Material {
    id: string
    nombre: string
    tiposDeterioros: Array<TipoDeterioro>

    constructor(id: string, nombre: string, tiposDeterioros: Array<TipoDeterioro>) {
        this.id = id
        this.nombre = nombre
        this.tiposDeterioros = tiposDeterioros
    }
}