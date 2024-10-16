import { Subsistema } from "src/inspeccion/subsistema/schemas/subsistema.schema"


export class Sistema {
    id: string
    nombre: string
    subsistemas: Array<Subsistema>
    herramientaId: string // indentificador de la herramienta seleccionada para dicho sistema
    constructor(id: string, nombre: string, subsistemas: Array<Subsistema>, herramientaId: string) {
        this.id = id
        this.nombre = nombre
        this.subsistemas = subsistemas
        this.herramientaId = herramientaId
    }
}