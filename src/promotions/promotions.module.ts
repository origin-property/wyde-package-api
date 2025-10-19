import { Promotion } from '@/database/entities/promotion.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsResolver } from './promotions.resolver';
import { PromotionsService } from './promotions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  providers: [PromotionsResolver, PromotionsService],
  exports: [PromotionsService],
})
export class PromotionsModule {}
