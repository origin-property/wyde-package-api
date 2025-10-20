import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { PackageItem } from './dto/package.dto';
import { ProductVariantModel } from './dto/productVariant.dto';
import {
  PackageItemVariantLoader,
  PackageItemVariantLoaderFactory,
} from './loader/PackageItemVariantLoader.factory';

@Resolver(() => PackageItem)
export class PackageItemsResolver {
  @ResolveField(() => ProductVariantModel)
  async productVariant(
    @Parent() { productVariantId }: PackageItem,
    @Loader(PackageItemVariantLoaderFactory) loader: PackageItemVariantLoader,
  ) {
    const result = await loader.load(productVariantId);
    return result?.values;
  }
}
