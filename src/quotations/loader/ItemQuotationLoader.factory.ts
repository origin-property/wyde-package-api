import { Quotation } from '@/database/entities/quotation.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { QuotationsService } from '../quotations.service';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

type QuotationId = string;
type ItemQuotationInfo = { id: QuotationId; values: Quotation };
type ItemQuotationLoader = LoaderFrom<ItemQuotationLoaderFactory>;

@Injectable()
class ItemQuotationLoaderFactory extends DataloaderFactory<
  QuotationId,
  ItemQuotationInfo
> {
  constructor(private readonly quotationService: QuotationsService) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results = await this.quotationService.getQuotationWithIds(ids);
    return singleAggregateBy<QuotationId, Quotation>(
      results,
      (item) => item.id,
    );
  }

  id(entity: ItemQuotationInfo) {
    return entity.id;
  }
}

export { ItemQuotationLoader, ItemQuotationLoaderFactory };
