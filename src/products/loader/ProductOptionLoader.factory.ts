import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { ProductsService } from '../products.service';
import { ProductOption } from '@/database/entities/product-option.entity';

type ProductId = string;
type ProductOptionInfo = Aggregated<ProductId, ProductOption>;
type ProductOptionLoader = LoaderFrom<ProductOptionLoaderFactory>;

@Injectable()
class ProductOptionLoaderFactory extends DataloaderFactory<
  ProductId,
  ProductOptionInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(ids: ProductId[], context: ExecutionContext) {
    const results = await this.productService.findOptionsByProductIds(ids);

    return this.aggregateBy(results, (product) => product.productId);
  }

  id(entity: ProductOptionInfo) {
    return entity.id;
  }
}

export { ProductOptionLoader, ProductOptionLoaderFactory };
