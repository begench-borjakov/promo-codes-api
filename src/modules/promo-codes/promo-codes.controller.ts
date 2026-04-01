import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { PromoCodesService } from './promo-codes.service';
import { PromoCodeRto } from './rto/promo-code.rto';
import { toPromoCodeRto } from './mappers/promo-code.mapper';

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @Post()
  async create(
    @Body() createPromoCodeDto: CreatePromoCodeDto,
  ): Promise<PromoCodeRto> {
    const promoCode = await this.promoCodesService.create(createPromoCodeDto);
    return toPromoCodeRto(promoCode);
  }

  @Get()
  async findAll(): Promise<PromoCodeRto[]> {
    const promoCodes = await this.promoCodesService.findAll();
    const promoCodesRto = promoCodes.map(toPromoCodeRto);
    return promoCodesRto;
  }
}
