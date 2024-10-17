import { TiposCampo } from "../schema/campo.schema"

export class CreateCampoDTO {
    nombre: string
    tipo: TiposCampo
    valor: string // representa el valor seleccionado para dicho campo
}