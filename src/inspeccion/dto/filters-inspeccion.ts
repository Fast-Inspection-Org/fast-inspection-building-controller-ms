export class FiltersInspeccion {
  edificacionId?: number;
  indiceCriticidad?: number;
  cantDeterioros?: number;

  constructor(
    edificacionId?: number,
    indiceCriticidad?: number,
    cantDeterioros?: number,
  ) {
    this.edificacionId = edificacionId;
    this.indiceCriticidad = indiceCriticidad;
    this.cantDeterioros = cantDeterioros;
  }
}
