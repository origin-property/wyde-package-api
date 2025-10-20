import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { ProductsService } from '../products.service';

type ProductId = string;
type ProductVariantInfo = Aggregated<ProductId, ProductVariant>;
type ProductVariantLoader = LoaderFrom<ProductVariantLoaderFactory>;

@Injectable()
class ProductVariantLoaderFactory extends DataloaderFactory<
  ProductId,
  ProductVariantInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(ids: ProductId[], context: ExecutionContext) {
    const results = await this.productService.findVariantsByProductIds(ids);

    return this.aggregateBy(results, (product) => product.productId);
  }

  id(entity: ProductVariantInfo) {
    return entity.id;
  }
}

export { ProductVariantLoader, ProductVariantLoaderFactory };
