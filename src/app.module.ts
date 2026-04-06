import { Module } from '@nestjs/common';
import { AppConfigModule } from './common/config/config.module';
import { ActivationsModule } from './modules/activations/activations.module';
import { PromoCodesModule } from './modules/promo-codes/promo-codes.module';

@Module({
  imports: [AppConfigModule, PromoCodesModule, ActivationsModule],
})
export class AppModule {}
