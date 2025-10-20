import { Product } from '@/database/entities/product.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ProductsService } from '../products.service';

type ProductId = string;
type VariantProductInfo = { id: ProductId; values: Product };
type VariantProductLoader = LoaderFrom<VariantProductLoaderFactory>;

@Injectable()
class VariantProductLoaderFactory extends DataloaderFactory<
  ProductId,
  VariantProductInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(ids: ProductId[], context: ExecutionContext) {
    const results = await this.productService.findProductsByIds(ids);

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: VariantProductInfo) {
    return entity.id;
  }
}

export { VariantProductLoader, VariantProductLoaderFactory };
