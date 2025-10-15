import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { DataloadersService } from './dataloaders/dataloaders.service';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductVariantModel } from './entities/productVariant.entity';
import { ProductModel } from './entities/product.entity';
import { ProductVariantImageModel } from './entities/productVariantImage.entity';
import { ProductOptionValueModel } from './entities/productOptionValue.entity';
import { VariantAttributeModel } from './entities/variant-attribute.entity';

@Resolver(() => ProductVariantModel)
export class ProductVariantResolver {
  constructor(private readonly dataloadersService: DataloadersService) {}

  @ResolveField('product', () => ProductModel)
  getProduct(@Parent() variant: ProductVariant): Promise<ProductModel> {
    return this.dataloadersService.productByIdLoader.load(variant.productId);
  }

  @ResolveField('images', () => [ProductVariantImageModel])
  getImages(@Parent() variant: ProductVariant): Promise<ProductVariantImage[]> {
    return this.dataloadersService.imagesByVariantIdLoader.load(variant.id);
  }

  @ResolveField('optionValues', () => [ProductOptionValueModel])
  getOptionValues(
    @Parent() variant: ProductVariant,
  ): Promise<ProductOptionValue[]> {
    return this.dataloadersService.optionValuesByVariantIdLoader.load(
      variant.id,
    );
  }

  @ResolveField('attributes', () => [VariantAttributeModel])
  async getAttributes(
    @Parent() variant: ProductVariant,
  ): Promise<VariantAttributeModel[]> {
    const selectedValues =
      await this.dataloadersService.optionValuesByVariantIdLoader.load(
        variant.id,
      );
    if (!selectedValues || selectedValues.length === 0) {
      return [];
    }

    const optionIds = [
      ...new Set(selectedValues.map((value) => value.productOptionId)),
    ];
    const parentOptions =
      await this.dataloadersService.productOptionByIdLoader.loadMany(optionIds);

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
