import { ActivationEntity } from '../entities/activation.entity';
import { ActivationRto } from '../rto/activation.rto';

export function toActivationRto(entity: ActivationEntity): ActivationRto {
  return {
    id: entity.id,
    promoCodeId: entity.promoCodeId,
    email: entity.email,
    discountPercentAtActivation: entity.discountPercentAtActivation,
    activatedAt: entity.activatedAt,
  };
}
