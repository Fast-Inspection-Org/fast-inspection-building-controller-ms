import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NameConfigsService } from 'src/utils/globals';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SistemaService } from './sistema/sistema.service';
import { Inspeccion } from './schemas/inspeccion.schema';
import { InspeccionSerializable } from './serializable/inspeccion.serializable';
import { FiltersInspeccion } from './dto/filters-inspeccion';
import { SistemaSerializable } from './sistema/serializable/sistema.serializable';
import { ApiPaginatedResponse } from 'src/utils/api-response';

@Injectable()
export class InspeccionService {
  constructor(
    @InjectModel(Inspeccion.name) private inspeccionModel: Model<Inspeccion>,
    @Inject(NameConfigsService) private readonly configsClient: ClientProxy,
    private sistemaService: SistemaService,
  ) {}
  public async create(createInspeccionDto: CreateInspeccionDto) {
    const inspectionFind = createInspeccionDto.id
      ? await this.inspeccionModel.findById(createInspeccionDto.id)
      : null;
    console.log(createInspeccionDto);
    console.log('Inspecciones a find');
    console.log(inspectionFind);
    // si existe una inspección con ese identificador, se borra de la base de datos para ser actualizada
    if (inspectionFind) await this.remove(inspectionFind._id.toString());

    // se realiza una estructuración de la inspección
    const inspeccion = new Inspeccion(
      new Date(),
      createInspeccionDto.edificacionId,
      createInspeccionDto.configId,
    );
    //se obtienen los sistemas configurados para dicha inspección
    inspeccion.sistemas = await this.sistemaService.getSistemasConfigurados(
      createInspeccionDto.configId,
      createInspeccionDto.deterioros,
      inspeccion,
    );
    console.log(inspeccion);
    // se realizan los cálculos
    await inspeccion.realizarCalculos();
    const inspeccionSchema = new this.inspeccionModel(inspeccion);
    console.log(inspeccion);
    console.log(inspeccionSchema);
    // se inserta en la base de datos la insepección
    const inspeccionBd = await inspeccionSchema.save();
    return {
      inspectionId: inspeccionBd._id,
    };
  }

  public async findAll(
    edificacionId?: number,
    indiceCriticidad?: number,
    cantDeterioros?: number,
    configId?: string,
  ): Promise<ApiPaginatedResponse<InspeccionSerializable[]>> {
    const inspeccionesSerializables: Array<InspeccionSerializable> =
      new Array<InspeccionSerializable>();
    // Construir el objeto de filtro dinámicamente y eliminar propiedades undefined
    // se construyen los filtros de las inspecciones
    const filters: FiltersInspeccion = new FiltersInspeccion(
      edificacionId,
      indiceCriticidad,
      cantDeterioros,
      configId,
    );
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key],
    ); // se eliminan los valores undefined de los filtros

    // se obtiene la list ade usuarios
    const inspecciones = await this.inspeccionModel.find(filters).exec();
    // se crean objetos serializables para las inspecciones
    inspecciones.forEach((inspeccion) => {
      inspeccionesSerializables.push(
        new InspeccionSerializable(
          inspeccion.id,
          inspeccion.fechaInicio,
          inspeccion.configVersion,
          inspeccion.indiceCriticidad,
          inspeccion.cantDeterioros,
        ),
      );
    });
    return { data: inspeccionesSerializables };
  }

  // Método para obtener todos los sistemas de una inspección
  public async findSistemas(inspeccionId: string) {
    // find the inspeccion
    const inspeccion = await this.inspeccionModel.findById(inspeccionId).exec();

    // se crean sistemas serializables
    if (inspeccion)
      return inspeccion.sistemas.map(
        (sistema) =>
          new SistemaSerializable(
            sistema.id,
            sistema.nombre,
            sistema.indiceCriticidad,
            sistema.cantDeterioros,
          ),
      );
    else
      throw new BadRequestException(
        'No existe una inspección con ese identificador',
      );
  }

  // Método para obtener todos los subsistemas de un sistema específicado
  public async findSubsistemas(inspeccionId: string, sistemaId: string) {
    // find the inspeccion
    const inspeccion = await this.inspeccionModel.findById(inspeccionId).exec();
    if (inspeccion)
      return this.sistemaService.findSubsistemas(
        sistemaId,
        inspeccion.sistemas,
      );
    else
      throw new BadRequestException(
        'No existe una inspección con ese identificador',
      );
  }

  // Método para obtener todos los materiales de un subsistema específicado
  public async findMateriales(
    inspeccionId: string,
    sistemaId: string,
    subsistemaId: string,
  ) {
    // find the inspeccion
    const inspeccion = await this.inspeccionModel.findById(inspeccionId).exec();
    if (inspeccion)
      return this.sistemaService.findMateriales(
        sistemaId,
        subsistemaId,
        inspeccion.sistemas,
      );
    else
      throw new BadRequestException(
        'No existe una inspección con ese identificador',
      );
  }

  // Método para obtener todos los tipos de deterioro de un material específicado
  public async findTiposDeterioros(
    inspeccionId: string,
    sistemaId: string,
    subsistemaId: string,
    materialId: string,
  ) {
    // find the inspeccion
    const inspeccion = await this.inspeccionModel.findById(inspeccionId).exec();
    if (inspeccion)
      return this.sistemaService.findMateriales(
        sistemaId,
        subsistemaId,
        inspeccion.sistemas,
      );
    else
      throw new BadRequestException(
        'No existe una inspección con ese identificador',
      );
  }

  async findOne(id: string) {
    return await this.inspeccionModel.findById(id);
  }

  async findEdificationLastInspection(edificationId: string) {
    const inspection = await this.inspeccionModel
      .findOne({ edificacionId: edificationId })
      .sort({ fechaInicio: -1 }) // Orden descendente por fecha
      .exec();

    if (inspection)
      return new InspeccionSerializable(
        inspection._id.toString(),
        inspection.fechaInicio,
        inspection.configVersion,
        inspection.indiceCriticidad,
        inspection.cantDeterioros,
      );
    else throw new Error('No existen inspecciones asociadas a la edificación');
  }

  update(id: number, updateInspeccionDto: UpdateInspeccionDto) {
    return `This action updates a #${id} inspeccion`;
  }

  async remove(id: string) {
    return await this.inspeccionModel.deleteOne({ _id: id });
  }
}
