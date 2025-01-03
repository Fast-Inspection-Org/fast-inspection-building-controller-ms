import { Controller, Body } from '@nestjs/common';
import { InspeccionService } from './inspeccion.service';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('inspeccion')
export class InspeccionController {
  constructor(private readonly inspeccionService: InspeccionService) {}

  @MessagePattern('create-inspection')
  public async create(@Body() createInspeccionDto: CreateInspeccionDto) {
    try {
      await this.inspeccionService.create(createInspeccionDto);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('find-inspections')
  public async findAll(edificacionId?: string) {
    try {
      return await this.inspeccionService.findAll(
        edificacionId ? +edificacionId : undefined,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('find-sistemas-inspection')
  public async findSistemas(inspeccionId: string) {
    try {
      return await this.inspeccionService.findSistemas(inspeccionId);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('find-subsistemas-inspection')
  public async findSubsistemas(payload: {
    inspeccionId: string;
    sistemaId: string;
  }) {
    try {
      return await this.inspeccionService.findSubsistemas(
        payload.inspeccionId,
        payload.sistemaId,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('find-materiales-inspection')
  public async findMateriales(payload: {
    inspeccionId: string;
    sistemaId: string;
    subsistemaId: string;
  }) {
    try {
      return await this.inspeccionService.findMateriales(
        payload.inspeccionId,
        payload.sistemaId,
        payload.subsistemaId,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('find-inspection')
  findOne(id: string) {
    try {
      return this.inspeccionService.findOne(+id);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('update-inspection')
  update(payload: { id: string; updateInspeccionDto: UpdateInspeccionDto }) {
    try {
      this.inspeccionService.update(+payload.id, payload.updateInspeccionDto);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('delete-inspection')
  remove(id: string) {
    try {
      this.inspeccionService.remove(+id);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }
}
