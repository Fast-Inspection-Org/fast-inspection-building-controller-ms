import { CreateCampoDTO } from "src/inspeccion/campo/dto/create-campo.dto"

export class CreateDeterioroDTO {
  codigo: string
  sistemaId: string
  subsistemaId: string
  materialId: string
  tipoDeterioroId: string
  campos: Array<CreateCampoDTO>
}