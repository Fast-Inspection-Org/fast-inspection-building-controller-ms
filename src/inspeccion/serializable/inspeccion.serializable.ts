export class InspeccionSerializable {
  id: string;
  fechaInicio: Date;
  configVersion: string;
  indiceCriticidad: number;
  cantDeterioros: number;

  constructor(
    id: string,
    fechaInicio: Date,
    configVersion: string,
    indiceCriticidad: number,
    cantDeterioros: number,
  ) {
    this.id = id;
    this.fechaInicio = fechaInicio;
    this.configVersion = configVersion;
    this.indiceCriticidad = indiceCriticidad;
    this.cantDeterioros = cantDeterioros;
  }
}
