import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { type } from "os";
import { Inspeccion } from "src/inspeccion/schemas/inspeccion.schema";

@Schema()
export class Edificacion {
    @Prop()
    nombre: string
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Inspeccion.name }] })
    historialInspecciones: Array<Inspeccion> // representa el historial de inspecciones realizadas sobre esa edificación
}

export const EdificacionSchema = SchemaFactory.createForClass(Edificacion)