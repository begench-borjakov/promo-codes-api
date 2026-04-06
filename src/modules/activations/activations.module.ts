import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { PromoCodesModule } from '../promo-codes/promo-codes.module';
import { ActivationsController } from './activations.controller';
import { ActivationsRepository } from './activations.repository';
import { ActivationsService } from './activations.service';

@Module({
  imports: [PrismaModule, PromoCodesModule],
  controllers: [ActivationsController],
  providers: [ActivationsService, ActivationsRepository],
})
export class ActivationsModule {}
