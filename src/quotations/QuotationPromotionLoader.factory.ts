import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { QuotationPromotionDto } from './dto/quotation-promotion.dto';
import { QuotationPromotionsService } from './quotation-promotion.service';

type QuotationId = string;
type QuotationPromotionInfo = Aggregated<QuotationId, QuotationPromotionDto>;
type QuotationPromotionLoader = LoaderFrom<QuotationPromotionLoaderFactory>;

@Injectable()
class QuotationPromotionLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationPromotionInfo
> {
  constructor(
    private readonly QuotationPromotionsService: QuotationPromotionsService,
  ) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results: QuotationPromotionDto[] =
      await this.QuotationPromotionsService.getQuotationPromotionsWithIds(ids);
    return this.aggregateBy(results, (item) => item.quotationId);
  }

  id(entity: QuotationPromotionInfo) {
    return entity.id;
  }
}

export { QuotationPromotionLoader, QuotationPromotionLoaderFactory };
