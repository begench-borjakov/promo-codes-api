import { PromoCodeEntity } from '../entities/promo-code.entity';
import { PromoCodeRto } from '../rto/promo-code.rto';

export function toPromoCodeRto(entity: PromoCodeEntity): PromoCodeRto {
  return {
    id: entity.id,
    code: entity.code,
    discountPercent: entity.discountPercent,
    activationLimit: entity.activationLimit,
    activationCount: entity.activationCount,
    expiresAt: entity.expiresAt,
  };
}
