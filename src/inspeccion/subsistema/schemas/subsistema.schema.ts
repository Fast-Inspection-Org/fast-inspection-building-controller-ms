import { Material } from "src/inspeccion/material/schemas/material.schema"

export class Subsistema {
    id: string
    nombre: string
    materiales: Array<Material>

    constructor(id: string, nombre: string, materiales: Array<Material>) {
        this.id = id
        this.nombre = nombre
        this.materiales = materiales
    }
}