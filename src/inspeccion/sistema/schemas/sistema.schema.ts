import { Herramienta } from "src/inspeccion/herramienta/schemas/herramienta.schema"
import { Subsistema } from "src/inspeccion/subsistema/schemas/subsistema.schema"


export class Sistema {
    id: string
    nombre: string
    subsistemas: Array<Subsistema>
    herramienta: Herramienta // herramienta seleccionada para dicho sistema
    constructor(id: string, nombre: string, subsistemas: Array<Subsistema>, herramienta: Herramienta) {
        this.id = id
        this.nombre = nombre
        this.subsistemas = subsistemas
        this.herramienta = herramienta
    }
}