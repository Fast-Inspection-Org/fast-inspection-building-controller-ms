import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Campo {
    @Prop()
    id: number
    @Prop()
    nombre: string
    @Prop()
    nivelImportancia: number
}

export const CampoSchema = SchemaFactory.createForClass(Campo)