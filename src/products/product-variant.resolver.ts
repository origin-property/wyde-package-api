import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { ProductModel } from './dto/product.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';
import { ProductVariantModel } from './dto/productVariant.dto';
import { ProductVariantImageModel } from './dto/productVariantImage.dto';
import { VariantAttributeModel } from './dto/variant-attribute.dto';
import {
  VariantImageLoader,
  VariantImageLoaderFactory,
} from './loader/VariantImageLoader.factory';
import {
  VariantProductLoader,
  VariantProductLoaderFactory,
} from './loader/VariantProductLoader.factory';
import {
  VariantMainImageLoader,
  VariantMainImageLoaderFactory,
} from './loader/VariantMainImageLoader.factory';

@Resolver(() => ProductVariantModel)
export class ProductVariantResolver {
  @ResolveField('product', () => ProductModel)
  async product(
    @Parent() { productId }: ProductVariant,
    @Loader(VariantProductLoaderFactory) loader: VariantProductLoader,
  ) {
    const result = await loader.load(productId);
    return result?.values;
  }

  @ResolveField('images', () => [ProductVariantImageModel])
  async images(
    @Parent() { id }: ProductVariant,
    @Loader(VariantImageLoaderFactory) loader: VariantImageLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }

  @ResolveField(() => ProductVariantImageModel, { nullable: true })
  async mainImage(
    @Parent() { id }: ProductVariant,
    @Loader(VariantMainImageLoaderFactory) loader: VariantMainImageLoader,
  ) {
    const result = await loader.load(id);

    return result?.values ?? null;
  }

  @ResolveField('optionValues', () => [ProductOptionValueModel])
  async getOptionValues(
    @Parent() variant: ProductVariant,
  ): Promise<ProductOptionValue[]> {
    return [];
  }

  @ResolveField('attributes', () => [VariantAttributeModel])
  async getAttributes(
    @Parent() variant: ProductVariant,
  ): Promise<VariantAttributeModel[]> {
    return [];
  }
}
