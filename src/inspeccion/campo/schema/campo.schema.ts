export enum TiposCampo {
    Numerico = 0
}

export class Campo {
    id: string
    nombre: string
    tipo: TiposCampo
    valor: string // representa el valor seleccionado para dicho campo

    constructor(
        id: string,
        nombre: string,
        tipo: TiposCampo,
        valor: string // representa el valor seleccionado para dicho campo
    ) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.valor = valor
    }
}