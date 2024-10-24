import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Herramienta } from "src/inspeccion/herramienta/schemas/herramienta.schema"
import { Subsistema, SubsistemaSchema } from "src/inspeccion/subsistema/schemas/subsistema.schema"


@Schema()
export class Sistema {
    @Prop()
    id: string
    @Prop()
    nombre: string
    @Prop({ type: [SubsistemaSchema] })
    subsistemas: Array<Subsistema>
    @Prop()
    herramienta: Herramienta // herramienta seleccionada para dicho sistema
    @Prop()
    indiceCriticidad: number
    @Prop()
    cantDeterioros: number
    constructor(id: string, nombre: string, herramienta: Herramienta) {
        this.id = id
        this.nombre = nombre
        this.subsistemas = new Array<Subsistema>()
        this.herramienta = herramienta
        this.indiceCriticidad = 0
        this.cantDeterioros = 0
    }

    public async calcularIndiceCriticidad() {
        let cant = 0
        for (let index = 0; index < this.subsistemas.length; index++) {
            const subsistema = this.subsistemas[index];
            cant += await subsistema.calcularIndiceCriticidad()
        }

        this.indiceCriticidad = cant // se almacena el cálculo para su serialziación

        return this.indiceCriticidad
    }

    public calcularCantDeterioros() {
        let cant = 0
        this.subsistemas.forEach((subsistema) => {
            cant += subsistema.calcularCantDeterioros()
        })

        this.cantDeterioros = cant // se almacena el cálculo para la serialización

        return this.cantDeterioros
    }

    public getCantDeterioros() {
        let cant = 0
        this.subsistemas.forEach((subsistema) => {
            cant += subsistema.getCantDeterioros()
        })

        return cant
    }
}

export const SistemaSchema = SchemaFactory.createForClass(Sistema)