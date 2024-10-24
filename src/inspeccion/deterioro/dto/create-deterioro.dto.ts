import { CreateCampoDefinidoDTO } from "src/inspeccion/campo-definido/dto/create-definido-campo.dto"


export class CreateDeterioroDTO {
  codigo: string
  sistemaId: string
  subsistemaId: string
  materialId: string
  tipoDeterioroId: string
  campos: Array<CreateCampoDefinidoDTO>
}