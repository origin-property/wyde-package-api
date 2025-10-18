import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { QuotationItem } from './entities/quotation-item.entity';
import { QuotationItemsService } from './quotation-items.service';

type QuotationId = string;
type QuotationItemPackageInfo = Aggregated<QuotationId, QuotationItem>;
type QuotationItemPackageLoader = LoaderFrom<QuotationItemPackageLoaderFactory>;

@Injectable()
class QuotationItemPackageLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationItemPackageInfo
> {
  constructor(private readonly quotationItemsService: QuotationItemsService) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results: QuotationItem[] =
      await this.quotationItemsService.getQuotationItemPackagesWithParentId(
        ids,
      );
    return this.aggregateBy(results, (item) => item.parentId);
  }

  id(entity: QuotationItemPackageInfo) {
    return entity.id;
  }
}

export { QuotationItemPackageLoader, QuotationItemPackageLoaderFactory };
