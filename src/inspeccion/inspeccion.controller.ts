import { Controller, Body, Param, Query } from '@nestjs/common';
import { InspeccionService } from './inspeccion.service';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('inspeccion')
export class InspeccionController {
  constructor(private readonly inspeccionService: InspeccionService) {}

  @MessagePattern('create-inspection')
  public async create(@Body() createInspeccionDto: CreateInspeccionDto) {
    return await this.inspeccionService.create(createInspeccionDto);
  }

  @MessagePattern('find-inspections')
  public async findAll(edificacionId?: string) {
    return await this.inspeccionService.findAll(
      edificacionId ? +edificacionId : undefined,
    );
  }

  @MessagePattern('find-sistemas-inspection')
  public async findSistemas(inspeccionId: string) {
    return await this.inspeccionService.findSistemas(inspeccionId);
  }

  @MessagePattern('find-subsistemas-inspection')
  public async findSubsistemas(payload: {
    inspeccionId: string;
    sistemaId: string;
  }) {
    return await this.inspeccionService.findSubsistemas(
      payload.inspeccionId,
      payload.sistemaId,
    );
  }

  @MessagePattern('find-materiales-inspection')
  public async findMateriales(payload: {
    inspeccionId: string;
    sistemaId: string;
    subsistemaId: string;
  }) {
    return await this.inspeccionService.findMateriales(
      payload.inspeccionId,
      payload.sistemaId,
      payload.subsistemaId,
    );
  }

  @MessagePattern('find-inspection')
  findOne(id: string) {
    return this.inspeccionService.findOne(+id);
  }

  @MessagePattern('update-inspection')
  update(payload: { id: string; updateInspeccionDto: UpdateInspeccionDto }) {
    return this.inspeccionService.update(
      +payload.id,
      payload.updateInspeccionDto,
    );
  }

  @MessagePattern('delete-inspection')
  remove(id: string) {
    return this.inspeccionService.remove(+id);
  }
}
