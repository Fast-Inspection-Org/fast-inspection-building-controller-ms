export class Herramienta {
    id: number // Atributo unico
    nombre: string
    tipo: string

    constructor(id: number, nombre: string, tipo: string) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
    }
}