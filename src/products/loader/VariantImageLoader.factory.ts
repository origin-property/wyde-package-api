import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { ProductsService } from '../products.service';

type VariantId = string;
type VariantImageInfo = Aggregated<VariantId, ProductVariantImage>;
type VariantImageLoader = LoaderFrom<VariantImageLoaderFactory>;

@Injectable()
class VariantImageLoaderFactory extends DataloaderFactory<
  VariantId,
  VariantImageInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(ids: VariantId[], context: ExecutionContext) {
    const results = await this.productService.findImagesByVariantIds(ids);

    return this.aggregateBy(results, (image) => image.productVariantId);
  }

  id(entity: VariantImageInfo) {
    return entity.id;
  }
}

export { VariantImageLoader, VariantImageLoaderFactory };
