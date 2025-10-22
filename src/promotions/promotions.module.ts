import { Promotion } from '@/database/entities/promotion.entity';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsResolver } from './promotions.resolver';
import { PromotionsService } from './promotions.service';
import { PromotionUserLoaderFactory } from './loader/PromotionsUserLoader.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), UsersModule],
  providers: [
    PromotionsResolver,
    PromotionsService,
    PromotionUserLoaderFactory,
  ],
  exports: [PromotionsService],
})
export class PromotionsModule {}
