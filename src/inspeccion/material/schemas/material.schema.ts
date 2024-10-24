import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SistemaSchema } from "src/inspeccion/sistema/schemas/sistema.schema";
import { TipoDeterioroAnalisisCriticidadSchema } from "src/inspeccion/tipo-deterioro-analisis-criticidad/schemas/tipo-deterioro-analisis-criticidad.schema";
import { TipoDeterioro } from "src/inspeccion/tipo-deterioro/schemas/tipo-deterioro.schema"
@Schema()
export class Material {
    @Prop()
    id: string
    @Prop()
    nombre: string
    @Prop({ type: [TipoDeterioroAnalisisCriticidadSchema] })
    tiposDeterioros: Array<TipoDeterioro>
    @Prop()
    indiceCriticidad: number
    @Prop()
    cantDeterioros: number

    constructor(id: string, nombre: string) {
        this.id = id
        this.nombre = nombre
        this.tiposDeterioros = new Array<TipoDeterioro>()
        this.indiceCriticidad = 0
        this.cantDeterioros = 0
    }

    public async calcularIndiceCriticidad() {
        let cant = 0
        for (let index = 0; index < this.tiposDeterioros.length; index++) {
            const tipoDeterioro = this.tiposDeterioros[index];
            cant += await tipoDeterioro.calcularIndiceCriticidad()
        }

        this.indiceCriticidad = cant // se almacena el cálculo para su serialziación

        return this.indiceCriticidad
    }

    public calcularCantDeterioros() {
        let cant = 0
        this.tiposDeterioros.forEach((tipoDeterioro) => {
            cant += tipoDeterioro.calcularCantDeterioros()
        })

        this.cantDeterioros = cant // se alamecena el cálculo para la serialización

        return this.cantDeterioros
    }

    public getCantDeterioros() {
        let cant = 0
        this.tiposDeterioros.forEach((tipoDeterioro) => {
            cant += tipoDeterioro.getCantDeterioros()
        })

        return cant
    }
}

export const MaterialSchema = SchemaFactory.createForClass(Material)