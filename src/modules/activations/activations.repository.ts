import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { ActivationEntity } from './entities/activation.entity';
import { CreateActivationPayload } from './types/activation.type';

@Injectable()
export class ActivationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateActivationPayload): Promise<ActivationEntity> {
    const activation = await this.prismaService.activation.create({
      data: {
        promoCodeId: data.promoCodeId,
        email: data.email,
        discountPercentAtActivation: data.discountPercentAtActivation,
      },
    });

    return {
      id: activation.id,
      promoCodeId: activation.promoCodeId,
      email: activation.email,
      discountPercentAtActivation: activation.discountPercentAtActivation,
      activatedAt: activation.activatedAt,
    };
  }
}
