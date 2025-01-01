export class InspeccionSerializable {
  fechaInicio: Date;
  configVersion: string;
  indiceCriticidad: number;
  cantDeterioros: number;

  constructor(
    fechaInicio: Date,
    configVersion: string,
    indiceCriticidad: number,
    cantDeterioros: number,
  ) {
    this.fechaInicio = fechaInicio;
    this.configVersion = configVersion;
    this.indiceCriticidad = indiceCriticidad;
    this.cantDeterioros = cantDeterioros;
  }
}
