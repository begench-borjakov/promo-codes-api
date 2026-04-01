import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { PromoCodeEntity } from './entities/promo-code.entity';
import { PromoCodesRepository } from './promo-codes.repository';

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
}
