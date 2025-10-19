import { QuotationPromotion } from '@/database/entities/quotation-promotion.entity';
import { PromotionKind } from '@/shared/enums/promotion.enum';
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

  async getQuotationPromotionsDiscountPriceWithIds(
    ids: readonly string[],
  ): Promise<
    {
      quotationId: string;
      value: number;
    }[]
  > {
    return this.quotationPromotionRepository
      .createQueryBuilder('q')
      .select('q.quotation_id', 'quotationId')
      .addSelect('SUM(q.value)', 'value')
      .where('q.kind = :kind', { kind: PromotionKind.DISCOUNT })
      .andWhere('q.quotation_id IN (:...quotationIds)', { quotationIds: ids })
      .groupBy('q.quotation_id')
      .getRawMany();
  }

  async getQuotationPromotionsVoucherPriceWithIds(
    ids: readonly string[],
  ): Promise<
    {
      quotationId: string;
      value: number;
    }[]
  > {
    return this.quotationPromotionRepository
      .createQueryBuilder('q')
      .select('q.quotation_id', 'quotationId')
      .addSelect('SUM(q.value)', 'value')
      .where('q.kind = :kind', { kind: PromotionKind.VOUCHER })
      .andWhere('q.quotation_id IN (:...quotationIds)', { quotationIds: ids })
      .groupBy('q.quotation_id')
      .getRawMany();
  }
}
