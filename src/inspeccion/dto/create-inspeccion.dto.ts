import { CreateDeterioroDTO } from "../deterioro/dto/create-deterioro.dto";


export class CreateInspeccionDto {
    edificacionId: string
    deterioros: CreateDeterioroDTO
}
