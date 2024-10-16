import { Deterioro } from "src/inspeccion/deterioro/schemas/deterioro.schema"

export class TipoDeterioro {
    id: string
    nombre: string
    deterioros: Array<Deterioro>
    
    constructor(id: string, nombre: string, deterioros: Array<Deterioro>) {
        this.id = id
        this.nombre = nombre
        this.deterioros = deterioros
    }
}