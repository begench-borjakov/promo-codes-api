import { Body, Controller, Post, Get, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from './dto/update-promo-code.dto';
import { PromoCodesService } from './promo-codes.service';
import { PromoCodeRto } from './rto/promo-code.rto';
import { toPromoCodeRto } from './mappers/promo-code.mapper';

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @Post()
  async create(@Body() createPromoCodeDto: CreatePromoCodeDto): Promise<PromoCodeRto> {
    const promoCode = await this.promoCodesService.create(createPromoCodeDto);
    return toPromoCodeRto(promoCode);
  }

  @Get()
  async findAll(): Promise<PromoCodeRto[]> {
    const promoCodes = await this.promoCodesService.findAll();
    const promoCodesRto = promoCodes.map(toPromoCodeRto);
    return promoCodesRto;
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<PromoCodeRto> {
    const promoCode = await this.promoCodesService.findById(id);

    return toPromoCodeRto(promoCode);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePromoCodeDto: UpdatePromoCodeDto,
  ): Promise<PromoCodeRto> {
    const updatedPromoCode = await this.promoCodesService.update(id, updatePromoCodeDto);

    return toPromoCodeRto(updatedPromoCode);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.promoCodesService.remove(id);
  }
}
