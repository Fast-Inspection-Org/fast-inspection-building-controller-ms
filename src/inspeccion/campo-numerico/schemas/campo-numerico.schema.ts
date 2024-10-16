import { Campo, TiposCampo } from "src/inspeccion/campo/schema/campo.schema";

export class CampoNumerico extends Campo {
    unidadMedida: string

    constructor(id: string,
        nombre: string,
        tipo: TiposCampo,
        valor: string, // representa el valor seleccionado para dicho campo
        unidadMedida: string) {
        super(id, nombre, tipo, valor)
        this.unidadMedida = unidadMedida
    }
}