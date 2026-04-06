export interface PromoCodeEntity {
  id: string;
  code: string;
  discountPercent: number;
  activationLimit: number;
  activationCount: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
