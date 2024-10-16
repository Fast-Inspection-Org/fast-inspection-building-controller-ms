import { CreateCampoDTO } from "src/inspeccion/campo/dto/campo.dto"

export class CreateDeterioroDTO {
  sistemaId: string
  subsistemaId: string
  materialId: string
  tipoDeterioroId: string
  campos: Array<CreateCampoDTO>
}