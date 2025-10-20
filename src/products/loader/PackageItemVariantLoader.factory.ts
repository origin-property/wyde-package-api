import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { ProductsService } from '../products.service';
import { ProductVariant } from '@/database/entities/product-variant.entity';

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

  async load(ids: VariantId[], context: ExecutionContext) {
    const results = await this.productService.findByVariantIds(ids);

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: PackageItemVariantInfo) {
    return entity.id;
  }
}

export { PackageItemVariantLoader, PackageItemVariantLoaderFactory };
