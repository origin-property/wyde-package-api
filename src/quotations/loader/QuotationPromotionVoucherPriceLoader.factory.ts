import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { QuotationPromotionsService } from '../quotation-promotion.service';

type QuotationId = string;
type QuotationPromotionVoucherPriceInfo = { id: string; value: number };
type QuotationPromotionVoucherPriceLoader =
  LoaderFrom<QuotationPromotionVoucherPriceLoaderFactory>;

@Injectable()
class QuotationPromotionVoucherPriceLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationPromotionVoucherPriceInfo
> {
  constructor(
    private readonly QuotationPromotionsService: QuotationPromotionsService,
  ) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results =
      await this.QuotationPromotionsService.getQuotationPromotionsVoucherPriceWithIds(
        ids,
      );

    return ids.map((id, index) => ({
      id,
      value: results[index].value,
    }));
  }

  id(entity: QuotationPromotionVoucherPriceInfo) {
    return entity.id;
  }
}

export {
  QuotationPromotionVoucherPriceLoader,
  QuotationPromotionVoucherPriceLoaderFactory,
};
