import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { PackageItem } from './dto/package.dto';
import { ProductVariantModel } from './dto/productVariant.dto';
import { ProductByVariantIdLoader } from './loader/product-variant.loader';

@Resolver(() => PackageItem)
export class PackageItemsResolver {
  @ResolveField(() => ProductVariantModel)
  async product(
    @Parent() { productVariantId }: PackageItem,
    @Loader(ProductByVariantIdLoader)
    productByVariantLoader: DataLoader<string, ProductVariantModel>,
  ): Promise<ProductVariantModel> {
    return productByVariantLoader.load(productVariantId);
  }
}
