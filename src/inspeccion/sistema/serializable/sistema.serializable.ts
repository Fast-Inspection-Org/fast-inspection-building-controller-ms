export class SistemaSerializable {
  id: string;
  nombre: string;
  indiceCriticidad: number;
  cantDeterioros: number;

  constructor(
    id: string,
    nombre: string,
    indiceCriticidad: number,
    cantDeterioros: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.indiceCriticidad = indiceCriticidad;
    this.cantDeterioros = cantDeterioros;
  }
}
