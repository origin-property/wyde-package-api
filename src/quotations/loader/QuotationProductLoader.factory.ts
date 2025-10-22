import { Product } from '@/database/entities/product.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ProductsService } from '../../products/products.service';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

type ProductId = string;
type QuotationProductInfo = { id: ProductId; values: Product };
type QuotationProductLoader = LoaderFrom<QuotationProductLoaderFactory>;

@Injectable()
class QuotationProductLoaderFactory extends DataloaderFactory<
  ProductId,
  QuotationProductInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(ids: ProductId[], context: ExecutionContext) {
    const results = await this.productService.findProductsByIds(ids);
    return singleAggregateBy<ProductId, Product>(results, (item) => item.id);
  }

  id(entity: QuotationProductInfo) {
    return entity.id;
  }
}

export { QuotationProductLoader, QuotationProductLoaderFactory };
