import { IsDateString, IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdatePromoCodeDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  discountPercent?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  activationLimit?: number;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
