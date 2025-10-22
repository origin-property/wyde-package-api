import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { ProductsService } from '../products.service';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import {
  singleAggregateBy,
  SingleAggregated,
} from '@/shared/singleAggregateBy';

type VariantId = string;
type PackageItemVariantInfo = { id: VariantId; values: ProductVariant };
type PackageItemVariantLoader = LoaderFrom<PackageItemVariantLoaderFactory>;

@Injectable()
class PackageItemVariantLoaderFactory extends DataloaderFactory<
  VariantId,
  PackageItemVariantInfo
> {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  async load(
    ids: VariantId[],
    context: ExecutionContext,
  ): Promise<SingleAggregated<VariantId, ProductVariant>[]> {
    const results = await this.productService.findByVariantIds(ids);

    return singleAggregateBy<VariantId, ProductVariant>(
      results,
      (item) => item.id,
    );
  }

  id(entity: PackageItemVariantInfo) {
    return entity.id;
  }
}

export { PackageItemVariantLoader, PackageItemVariantLoaderFactory };
