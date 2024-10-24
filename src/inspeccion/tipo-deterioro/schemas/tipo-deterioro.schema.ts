import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Deterioro, DeterioroSchema } from "src/inspeccion/deterioro/schemas/deterioro.schema"
import { Indicador, IndicadorSchema } from "src/inspeccion/indicador/shcemas/indicador.schema"


export abstract class TipoDeterioro {
    @Prop()
    id: string
    @Prop()
    nombre: string
    @Prop({ type: [DeterioroSchema] })
    deterioros: Array<Deterioro>
    @Prop({ type: IndicadorSchema })
    indiceCriticidad: Indicador | undefined
    @Prop()
    cantDeterioros: number

    constructor(id: string, nombre: string, deterioros: Array<Deterioro>) {
        this.id = id
        this.nombre = nombre
        this.deterioros = deterioros
        this.indiceCriticidad = undefined
        this.cantDeterioros = 0
    }

    public abstract calcularIndiceCriticidad(): Promise<number>;

    public calcularCantDeterioros() {
        this.cantDeterioros = this.getCantDeterioros() // se alamcena el cálculo para la serializació
        return this.cantDeterioros
    }

    public getCantDeterioros() {
        return this.deterioros.length
    }
}

