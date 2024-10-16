import { Controller } from '@nestjs/common';
import { SubsistemaService } from './subsistema.service';

@Controller('subsistema')
export class SubsistemaController {
  constructor(private readonly subsistemaService: SubsistemaService) {}
}
