import { CreateHerramientaDTO } from "src/inspeccion/herramienta/dto/create-herramienta.dto"

export class CreateSistemaDTO {
    id: string
    nombre: string
    cantSubsistemas: number
    herramienta: CreateHerramientaDTO // representa el nombre de la herramienta a la que pertenece el sistema
    configVersion: number // indica la versión de la configuración a la cual pertenece el sistema
}