import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductOptionModel } from './dto/productOption.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';
import { OptionByIdLoader } from './loader/option-by-id.loader';

@Resolver(() => ProductOptionValueModel)
export class ProductOptionValueResolver {
  constructor() {}

  @ResolveField('productOption', () => ProductOptionModel)
  getProductOption(
    @Parent() value: ProductOptionValue,
    @Loader(OptionByIdLoader) loader: DataLoader<string, ProductOption>,
  ): Promise<ProductOption> {
    return loader.load(value.productOptionId);
  }
}
