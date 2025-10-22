import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { ProductsService } from '../products.service';
import {
  singleAggregateBy,
  SingleAggregated,
} from '@/shared/singleAggregateBy';

type VariantId = string;
type VariantMainImageInfo = {
  id: VariantId;
  values: ProductVariantImage;
};
type VariantMainImageLoader = LoaderFrom<VariantMainImageLoaderFactory>;

@Injectable()
class VariantMainImageLoaderFactory extends DataloaderFactory<
  VariantId,
  VariantMainImageInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(
    ids: VariantId[],
    context: ExecutionContext,
  ): Promise<SingleAggregated<VariantId, ProductVariantImage>[]> {
    const results = await this.productService.findMainImageByVariantIds(ids);

    return singleAggregateBy<VariantId, ProductVariantImage>(
      results,
      (image) => image.productVariantId,
    );
  }

  id(entity: VariantMainImageInfo) {
    return entity.id;
  }
}

export { VariantMainImageLoader, VariantMainImageLoaderFactory };
