export interface ActivationEntity {
  id: string;
  promoCodeId: string;
  email: string;
  discountPercentAtActivation: number;
  activatedAt: Date;
}
