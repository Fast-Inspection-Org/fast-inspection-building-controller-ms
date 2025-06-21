export class FiltersInspeccion {
  edificacionId?: number;
  indiceCriticidad?: number;
  cantDeterioros?: number;
  configId?: string;

  constructor(
    edificacionId?: number,
    indiceCriticidad?: number,
    cantDeterioros?: number,
    configId?: string,
  ) {
    this.edificacionId = edificacionId;
    this.indiceCriticidad = indiceCriticidad;
    this.cantDeterioros = cantDeterioros;
    this.configId = configId;
  }
}
