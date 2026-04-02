import { Controller, Get } from '@nestjs/common';
import { toActivationRto } from './mappers/activation.mapper';
import { ActivationRto } from './rto/activation.rto';
import { ActivationsService } from './activations.service';

@Controller('activations')
export class ActivationsController {
  constructor(private readonly activationsService: ActivationsService) {}

  @Get()
  async findAll(): Promise<ActivationRto[]> {
    const activations = await this.activationsService.findAll();
    const activationsRto = activations.map(toActivationRto);

    return activationsRto;
  }
}
