import { TiposCampo } from "../schema/campo-definido.schema"

export class CreateCampoDefinidoDTO {
    nombre: string
    tipo: TiposCampo
    valor: string // representa el valor seleccionado para dicho campo
}