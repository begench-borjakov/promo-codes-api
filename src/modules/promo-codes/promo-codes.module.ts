import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { PromoCodesController } from './promo-codes.controller';
import { PromoCodesRepository } from './promo-codes.repository';
import { PromoCodesService } from './promo-codes.service';

@Module({
  imports: [PrismaModule],
  controllers: [PromoCodesController],
  providers: [PromoCodesService, PromoCodesRepository],
  exports: [PromoCodesService],
})
export class PromoCodesModule {}
