import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductOptionModel } from './dto/productOption.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';

@Resolver(() => ProductOptionModel)
export class ProductOptionResolver {
  @ResolveField('optionValues', () => [ProductOptionValueModel])
  async getOptionValues(
    @Parent() option: ProductOption,
  ): Promise<ProductOptionValue[]> {
    return [];
  }
}
