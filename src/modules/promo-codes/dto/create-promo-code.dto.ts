import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePromoCodeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  code: string;

  @IsInt()
  @Min(1)
  @Max(100)
  discountPercent: number;

  @IsInt()
  @Min(1)
  activationLimit: number;

  @IsDateString()
  expiresAt: string;
}
