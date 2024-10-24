import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Material, MaterialSchema } from "src/inspeccion/material/schemas/material.schema"

@Schema()
export class Subsistema {
    @Prop()
    id: string
    @Prop()
    nombre: string
    @Prop({ type: [MaterialSchema] })
    materiales: Array<Material>
    @Prop()
    indiceCriticidad: number
    @Prop()
    cantDeterioros: number

    constructor(id: string, nombre: string) {
        this.id = id
        this.nombre = nombre
        this.materiales = new Array<Material>()
        this.indiceCriticidad = 0
        this.cantDeterioros = 0
    }

    public async calcularIndiceCriticidad() {
        let cant = 0
        for (let index = 0; index < this.materiales.length; index++) {
            const material = this.materiales[index];
            cant += await material.calcularIndiceCriticidad()
        }

        this.indiceCriticidad = cant // se almacena el cálculo para su serialziación

        return this.indiceCriticidad
    }

    public calcularCantDeterioros() {
        let cant = 0
        this.materiales.forEach((material) => {
            cant += material.calcularCantDeterioros()
        })

        this.cantDeterioros = cant // se almacena el cálculo para la serialización

        return this.cantDeterioros
    }

    public getCantDeterioros() {
        let cant = 0
        this.materiales.forEach((material) => {
            cant += material.getCantDeterioros()
        })

        return cant
    }
}

export const SubsistemaSchema = SchemaFactory.createForClass(Subsistema)