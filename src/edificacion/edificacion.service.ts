import { Injectable } from '@nestjs/common';
import { CreateEdificacionDto } from './dto/create-edificacion.dto';
import { UpdateEdificacionDto } from './dto/update-edificacion.dto';

@Injectable()
export class EdificacionService {
  create(createEdificacionDto: CreateEdificacionDto) {
    return 'This action adds a new edificacion';
  }

  findAll() {
    return `This action returns all edificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} edificacion`;
  }

  update(id: number, updateEdificacionDto: UpdateEdificacionDto) {
    return `This action updates a #${id} edificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} edificacion`;
  }
}
