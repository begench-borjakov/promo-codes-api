import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActivationsModule } from './modules/activations/activations.module';
import { PromoCodesModule } from './modules/promo-codes/promo-codes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PromoCodesModule,
    ActivationsModule,
  ],
})
export class AppModule {}
