import { CreateCampoDTO } from "src/inspeccion/campo/dto/create-campo.dto"

export class CreateTipoDeterioroAnalisisCriticidadDTO {
    id: string
    nombre: string
    detectabilidad: number
    camposAfectados: Array<CreateCampoDTO>
    cantCamposAfectados: number
    cantCausas: number
}