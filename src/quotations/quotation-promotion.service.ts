import { QuotationPromotion } from '@/database/entities/quotation-promotion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class QuotationPromotionsService {
  constructor(
    @InjectRepository(QuotationPromotion)
    private quotationPromotionRepository: Repository<QuotationPromotion>,
  ) {}

  async getQuotationPromotionsWithIds(ids: readonly string[]) {
    return this.quotationPromotionRepository.find({
      where: { quotationId: In(ids) },
    });
  }
}
