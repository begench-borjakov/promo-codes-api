import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromoCodesModule } from './modules/promo-codes/promo-codes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PromoCodesModule,
  ],
})
export class AppModule {}
