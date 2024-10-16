import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InspeccionService } from './inspeccion.service';
import { CreateInspeccionDto } from './dto/create-inspeccion.dto';
import { UpdateInspeccionDto } from './dto/update-inspeccion.dto';

@Controller('inspeccion')
export class InspeccionController {
  constructor(private readonly inspeccionService: InspeccionService) { }

  @Post()
  public async create(@Body() createInspeccionDto: CreateInspeccionDto) {
    return await this.inspeccionService.create(createInspeccionDto);
  }

  @Get()
  findAll() {
    return this.inspeccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspeccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInspeccionDto: UpdateInspeccionDto) {
    return this.inspeccionService.update(+id, updateInspeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspeccionService.remove(+id);
  }
}
