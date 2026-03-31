export interface CreatePromoCodePayload {
  code: string;
  discountPercent: number;
  activationLimit: number;
  expiresAt: Date;
}
