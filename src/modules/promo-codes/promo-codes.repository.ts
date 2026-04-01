import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PromoCodeEntity } from './entities/promo-code.entity';
import { CreatePromoCodePayload } from './types/promo-code.type';

@Injectable()
export class PromoCodesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreatePromoCodePayload): Promise<PromoCodeEntity> {
    const promoCode = await this.prismaService.promoCode.create({
      data: {
        code: data.code,
        discountPercent: data.discountPercent,
        activationLimit: data.activationLimit,
        expiresAt: data.expiresAt,
      },
    });

    return {
      id: promoCode.id,
      code: promoCode.code,
      discountPercent: promoCode.discountPercent,
      activationLimit: promoCode.activationLimit,
      activationCount: promoCode.activationCount,
      expiresAt: promoCode.expiresAt,
      createdAt: promoCode.createdAt,
      updatedAt: promoCode.updatedAt,
    };
  }

  async findAll(): Promise<PromoCodeEntity[]> {
    const promoCodes = await this.prismaService.promoCode.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return promoCodes.map((promoCode) => ({
      id: promoCode.id,
      code: promoCode.code,
      discountPercent: promoCode.discountPercent,
      activationLimit: promoCode.activationLimit,
      activationCount: promoCode.activationCount,
      expiresAt: promoCode.expiresAt,
      createdAt: promoCode.createdAt,
      updatedAt: promoCode.updatedAt,
    }));
  }
}
