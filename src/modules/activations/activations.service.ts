import { Injectable, ConflictException } from '@nestjs/common';
import { ActivationEntity } from './entities/activation.entity';
import { ActivationsRepository } from './activations.repository';
import { PromoCodesService } from '../promo-codes/promo-codes.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';
import { CreateActivationDto } from './dto/activate-promo-code.dto';

@Injectable()
export class ActivationsService {
  constructor(
    private readonly activationsRepository: ActivationsRepository,
    private readonly promoCodesService: PromoCodesService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<ActivationEntity[]> {
    const activations = await this.activationsRepository.findAll();

    return activations;
  }

  private async ensureActivationDoesNotExistTx(
    tx: Prisma.TransactionClient,
    promoCodeId: string,
    email: string,
  ): Promise<void> {
    const existingActivation =
      await this.activationsRepository.findByPromoCodeIdAndEmailTx(
        tx,
        promoCodeId,
        email,
      );

    if (existingActivation) {
      throw new ConflictException(
        'This email has already activated the promo code',
      );
    }
  }

  private async createActivationTx(
    tx: Prisma.TransactionClient,
    promoCodeId: string,
    email: string,
    discountPercentAtActivation: number,
  ): Promise<ActivationEntity> {
    return this.activationsRepository.createTx(tx, {
      promoCodeId,
      email,
      discountPercentAtActivation,
    });
  }

  async activate(
    createActivationDto: CreateActivationDto,
  ): Promise<ActivationEntity> {
    const activation = await this.prismaService.$transaction(async (tx) => {
      const promoCode = await this.promoCodesService.findByCodeTx(
        tx,
        createActivationDto.code,
      );

      this.promoCodesService.validatePromoCodeAvailability(promoCode);

      await this.ensureActivationDoesNotExistTx(
        tx,
        promoCode.id,
        createActivationDto.email,
      );

      const createdActivation = await this.createActivationTx(
        tx,
        promoCode.id,
        createActivationDto.email,
        promoCode.discountPercent,
      );

      await this.promoCodesService.incrementActivationCountTx(tx, promoCode.id);

      return createdActivation;
    });

    return activation;
  }
}
