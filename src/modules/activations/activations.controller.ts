import { Controller, Get, Post, Body } from '@nestjs/common';
import { toActivationRto } from './mappers/activation.mapper';
import { CreateActivationDto } from './dto/activate-promo-code.dto';
import { ActivationRto } from './rto/activation.rto';
import { ActivationsService } from './activations.service';

@Controller('activations')
export class ActivationsController {
  constructor(private readonly activationsService: ActivationsService) {}

  @Post()
  async activate(
    @Body() createActivationDto: CreateActivationDto,
  ): Promise<ActivationRto> {
    const activation =
      await this.activationsService.activate(createActivationDto);

    return toActivationRto(activation);
  }

  @Get()
  async findAll(): Promise<ActivationRto[]> {
    const activations = await this.activationsService.findAll();
    const activationsRto = activations.map(toActivationRto);

    return activationsRto;
  }
}
