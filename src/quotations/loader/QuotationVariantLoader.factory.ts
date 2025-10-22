import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ProductsService } from '../../products/products.service';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

type VariantId = string;
type QuotationVariantInfo = { id: VariantId; values: ProductVariant };
type QuotationVariantLoader = LoaderFrom<QuotationVariantLoaderFactory>;

@Injectable()
class QuotationVariantLoaderFactory extends DataloaderFactory<
  VariantId,
  QuotationVariantInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(ids: VariantId[], context: ExecutionContext) {
    const results = await this.productService.findByVariantIds(ids);
    return singleAggregateBy<VariantId, ProductVariant>(
      results,
      (item) => item.id,
    );
  }

  id(entity: QuotationVariantInfo) {
    return entity.id;
  }
}

export { QuotationVariantLoader, QuotationVariantLoaderFactory };
