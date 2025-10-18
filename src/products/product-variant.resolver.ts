import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ImagesByVariantLoader } from './dataloaders/images-by-variant.loader';
import { OptionByIdLoader } from './dataloaders/option-by-id.loader';
import { OptionValuesByVariantLoader } from './dataloaders/option-values-by-variant.loader';
import { ProductByIdLoader } from './dataloaders/product-by-id.loader';
import { ProductModel } from './dto/product.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';
import { ProductVariantModel } from './dto/productVariant.dto';
import { ProductVariantImageModel } from './dto/productVariantImage.dto';
import { VariantAttributeModel } from './dto/variant-attribute.dto';

@Resolver(() => ProductVariantModel)
export class ProductVariantResolver {
  @ResolveField('product', () => ProductModel)
  getProduct(
    @Parent() variant: ProductVariant,
    @Loader(ProductByIdLoader) loader: DataLoader<string, ProductModel>,
  ): Promise<ProductModel> {
    return loader.load(variant.productId);
  }

  @ResolveField('images', () => [ProductVariantImageModel])
  getImages(
    @Parent() variant: ProductVariant,
    @Loader(ImagesByVariantLoader)
    loader: DataLoader<string, ProductVariantImage[]>,
  ): Promise<ProductVariantImage[]> {
    return loader.load(variant.id);
  }

  @ResolveField('optionValues', () => [ProductOptionValueModel])
  getOptionValues(
    @Parent() variant: ProductVariant,
    @Loader(OptionValuesByVariantLoader)
    loader: DataLoader<string, ProductOptionValue[]>,
  ): Promise<ProductOptionValue[]> {
    return loader.load(variant.id);
  }

  @ResolveField('attributes', () => [VariantAttributeModel])
  async getAttributes(
    @Parent() variant: ProductVariant,
    @Loader(OptionValuesByVariantLoader)
    valuesLoader: DataLoader<string, ProductOptionValue[]>,
    @Loader(OptionByIdLoader) optionLoader: DataLoader<string, ProductOption>,
  ): Promise<VariantAttributeModel[]> {
    const selectedValues = await valuesLoader.load(variant.id);
    if (!selectedValues || selectedValues.length === 0) return [];

    const optionIds = [
      ...new Set(selectedValues.map((value) => value.productOptionId)),
    ];
    const parentOptions = await optionLoader.loadMany(optionIds);

    const attributes = parentOptions
      .map((option) => {
        if (option && !(option instanceof Error)) {
          const relevantValue = selectedValues.find(
            (value) => value.productOptionId === option.id,
          );

          if (relevantValue) {
            return {
              ...option,
              optionValue: relevantValue,
            };
          }
        }
        return null;
      })
      .filter(Boolean);

    return attributes;
  }
}
