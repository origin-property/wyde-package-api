import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductOptionModel } from './dto/productOption.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';
import { OptionValuesByOptionIdLoader } from './loader/option-values-by-option-id.loader';

@Resolver(() => ProductOptionModel)
export class ProductOptionResolver {
  @ResolveField('optionValues', () => [ProductOptionValueModel])
  getOptionValues(
    @Parent() option: ProductOption,
    @Loader(OptionValuesByOptionIdLoader)
    loader: DataLoader<string, ProductOptionValue[]>,
  ): Promise<ProductOptionValue[]> {
    return loader.load(option.id);
  }
}
