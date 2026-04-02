import { Injectable } from '@nestjs/common';
import { ActivationEntity } from './entities/activation.entity';
import { ActivationsRepository } from './activations.repository';

@Injectable()
export class ActivationsService {
  constructor(private readonly activationsRepository: ActivationsRepository) {}

  async findAll(): Promise<ActivationEntity[]> {
    const activations = await this.activationsRepository.findAll();

    return activations;
  }
}
