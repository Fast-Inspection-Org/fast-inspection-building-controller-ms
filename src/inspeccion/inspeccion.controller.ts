import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InspeccionService } from './inspeccion.service';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';

@Controller('inspeccion')
export class InspeccionController {
  constructor(private readonly inspeccionService: InspeccionService) {}

  @Post()
  public async create(@Body() createInspeccionDto: CreateInspeccionDto) {
    return await this.inspeccionService.create(createInspeccionDto);
  }

  @Get()
  public async findAll(@Query('edificacionId') edificacionId?: string) {
    return await this.inspeccionService.findAll(
      edificacionId ? +edificacionId : undefined,
    );
  }

  @Get('find-sistemas/:inspeccionId')
  public async findSistemas(@Param('inspeccionId') inspeccionId: string) {
    return await this.inspeccionService.findSistemas(inspeccionId);
  }

  @Get('find-subsistemas/:inspeccionId/:sistemaId')
  public async findSubsistemas(
    @Param('inspeccionId') inspeccionId: string,
    @Param('sistemaId') sistemaId: string,
  ) {
    return await this.inspeccionService.findSubsistemas(
      inspeccionId,
      sistemaId,
    );
  }

  @Get('find-materiales/:inspeccionId/:sistemaId/:subsistemaId')
  public async findMateriales(
    @Param('inspeccionId') inspeccionId: string,
    @Param('sistemaId') sistemaId: string,
    @Param('subsistemaId') subsistemaId: string,
  ) {
    return await this.inspeccionService.findMateriales(
      inspeccionId,
      sistemaId,
      subsistemaId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspeccionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInspeccionDto: UpdateInspeccionDto,
  ) {
    return this.inspeccionService.update(+id, updateInspeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspeccionService.remove(+id);
  }
}
