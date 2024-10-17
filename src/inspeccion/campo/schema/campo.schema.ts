export enum TiposCampo {
    Numerico = "Numérico"
}

export class Campo {
    nombre: string
    tipo: TiposCampo
    valor: string // representa el valor seleccionado para dicho campo

    constructor(

        nombre: string,
        tipo: TiposCampo,
        valor: string // representa el valor seleccionado para dicho campo
    ) {
        this.nombre = nombre
        this.tipo = tipo
        this.valor = valor
    }
}