import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductOptionModel } from './dto/productOption.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';

@Resolver(() => ProductOptionValueModel)
export class ProductOptionValueResolver {
  constructor() {}

  @ResolveField('productOption', () => ProductOptionModel, { nullable: true })
  getProductOption(
    @Parent() value: ProductOptionValue,
  ): Promise<ProductOption> {
    return null;
  }
}
