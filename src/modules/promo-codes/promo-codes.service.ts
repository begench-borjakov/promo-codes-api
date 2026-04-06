import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from './dto/update-promo-code.dto';
import { PromoCodeEntity } from './entities/promo-code.entity';
import { PromoCodesRepository } from './promo-codes.repository';
import { UpdatePromoCodePayload } from './types/promo-code.type';
import { Prisma } from '../../../generated/prisma/client';

@Injectable()
export class PromoCodesService {
  constructor(private readonly promoCodesRepository: PromoCodesRepository) {}

  async create(
    createPromoCodeDto: CreatePromoCodeDto,
  ): Promise<PromoCodeEntity> {
    const promoCode = await this.promoCodesRepository.create({
      code: createPromoCodeDto.code,
      discountPercent: createPromoCodeDto.discountPercent,
      activationLimit: createPromoCodeDto.activationLimit,
      expiresAt: new Date(createPromoCodeDto.expiresAt),
    });

    return promoCode;
  }

  async findAll(): Promise<PromoCodeEntity[]> {
    const promoCodes = await this.promoCodesRepository.findAll();
    return promoCodes;
  }

  async findById(id: string): Promise<PromoCodeEntity> {
    const promoCode = await this.promoCodesRepository.findById(id);

    if (!promoCode) {
      throw new NotFoundException('Promo code not found');
    }

    return promoCode;
  }

  async update(
    id: string,
    updatePromoCodeDto: UpdatePromoCodeDto,
  ): Promise<PromoCodeEntity> {
    const existingPromoCode = await this.promoCodesRepository.findById(id);

    if (!existingPromoCode) {
      throw new NotFoundException('Promo code not found');
    }

    if (
      updatePromoCodeDto.discountPercent === undefined &&
      updatePromoCodeDto.activationLimit === undefined &&
      updatePromoCodeDto.expiresAt === undefined
    ) {
      throw new BadRequestException('At least one field must be provided');
    }

    let expiresAtDate: Date | undefined;

    if (updatePromoCodeDto.expiresAt !== undefined) {
      expiresAtDate = new Date(updatePromoCodeDto.expiresAt);

      const now = new Date();

      if (expiresAtDate <= now) {
        throw new BadRequestException('Expiration date must be in the future');
      }
    }

    if (
      updatePromoCodeDto.activationLimit !== undefined &&
      updatePromoCodeDto.activationLimit < existingPromoCode.activationCount
    ) {
      throw new BadRequestException(
        'Activation limit cannot be less than activation count',
      );
    }

    const updateData: UpdatePromoCodePayload = {
      discountPercent: updatePromoCodeDto.discountPercent,
      activationLimit: updatePromoCodeDto.activationLimit,
      expiresAt: expiresAtDate,
    };

    const updatedPromoCode = await this.promoCodesRepository.updateById(
      id,
      updateData,
    );

    return updatedPromoCode;
  }

  async remove(id: string): Promise<void> {
    const existingPromoCode = await this.promoCodesRepository.findById(id);

    if (!existingPromoCode) {
      throw new NotFoundException('Promo code not found');
    }

    await this.promoCodesRepository.deleteById(id);
  }

  async findByCodeTx(
    tx: Prisma.TransactionClient,
    code: string,
  ): Promise<PromoCodeEntity> {
    const promoCode = await this.promoCodesRepository.findByCodeTx(tx, code);

    if (!promoCode) {
      throw new NotFoundException('Promo code not found');
    }

    return promoCode;
  }
  validatePromoCodeAvailability(promoCode: PromoCodeEntity): void {
    const now = new Date();

    if (promoCode.expiresAt <= now) {
      throw new BadRequestException('Promo code has expired');
    }

    if (promoCode.activationCount >= promoCode.activationLimit) {
      throw new BadRequestException('Promo code activation limit exceeded');
    }
  }

  async incrementActivationCountTx(
    tx: Prisma.TransactionClient,
    id: string,
  ): Promise<PromoCodeEntity> {
    const updatedPromoCode =
      await this.promoCodesRepository.incrementPromoCodeActivationCountTx(
        tx,
        id,
      );

    return updatedPromoCode;
  }
}
