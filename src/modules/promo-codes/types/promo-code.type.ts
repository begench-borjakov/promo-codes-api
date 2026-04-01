export interface CreatePromoCodePayload {
  code: string;
  discountPercent: number;
  activationLimit: number;
  expiresAt: Date;
}

export interface UpdatePromoCodePayload {
  discountPercent?: number;
  activationLimit?: number;
  expiresAt?: Date;
}
