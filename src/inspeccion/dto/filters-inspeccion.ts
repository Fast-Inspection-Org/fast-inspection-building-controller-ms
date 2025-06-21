export class FiltersInspeccion {
  edificacionId?: number;
  indiceCriticidad?: number;
  cantDeterioros?: number;
  configVersion?: string;

  constructor(
    edificacionId?: number,
    indiceCriticidad?: number,
    cantDeterioros?: number,
    configVersion?: string,
  ) {
    this.edificacionId = edificacionId;
    this.indiceCriticidad = indiceCriticidad;
    this.cantDeterioros = cantDeterioros;
    this.configVersion = configVersion;
  }
}
