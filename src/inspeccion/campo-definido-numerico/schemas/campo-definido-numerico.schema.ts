import { CampoDefinido, TiposCampo } from "src/inspeccion/campo-definido/schema/campo-definido.schema"


export class CampoDefinidoNumerico extends CampoDefinido {
    unidadMedida: string

    constructor(
        nombre: string,
        tipo: TiposCampo,
        valor: string, // representa el valor seleccionado para dicho campo
        unidadMedida: string) {
        super(nombre, tipo, valor)
        this.unidadMedida = unidadMedida
    }
}