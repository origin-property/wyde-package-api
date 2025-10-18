import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOptionModel } from './dto/productOption.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { OptionValuesByOptionIdLoader } from './dataloaders/option-values-by-option-id.loader';

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
