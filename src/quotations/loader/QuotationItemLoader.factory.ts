import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { QuotationItem } from '../dto/quotation-item.dto';
import { QuotationItemsService } from '../quotation-items.service';

type QuotationId = string;
type QuotationItemInfo = Aggregated<QuotationId, QuotationItem>;
type QuotationItemLoader = LoaderFrom<QuotationItemLoaderFactory>;

@Injectable()
class QuotationItemLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationItemInfo
> {
  constructor(private readonly quotationItemsService: QuotationItemsService) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results: QuotationItem[] =
      await this.quotationItemsService.getQuotationItemsWithIds(ids);
    return this.aggregateBy(results, (item) => item.quotationId);
  }

  id(entity: QuotationItemInfo) {
    return entity.id;
  }
}

export { QuotationItemLoader, QuotationItemLoaderFactory };
