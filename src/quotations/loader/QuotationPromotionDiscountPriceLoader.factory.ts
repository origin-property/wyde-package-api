import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { QuotationPromotionsService } from '../quotation-promotion.service';

type QuotationId = string;
type QuotationPromotionDiscountPriceInfo = { id: string; value: number };
type QuotationPromotionDiscountPriceLoader =
  LoaderFrom<QuotationPromotionDiscountPriceLoaderFactory>;

@Injectable()
class QuotationPromotionDiscountPriceLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationPromotionDiscountPriceInfo
> {
  constructor(
    private readonly QuotationPromotionsService: QuotationPromotionsService,
  ) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results =
      await this.QuotationPromotionsService.getQuotationPromotionsDiscountPriceWithIds(
        ids,
      );

    return ids.map((id, index) => ({
      id,
      value: results[index]?.value ?? 0,
    }));
  }

  id(entity: QuotationPromotionDiscountPriceInfo) {
    return entity.id;
  }
}

export {
  QuotationPromotionDiscountPriceLoader,
  QuotationPromotionDiscountPriceLoaderFactory,
};
