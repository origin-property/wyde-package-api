import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { DataloadersService } from './dataloaders/dataloaders.service';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOptionModel } from './entities/productOption.entity';
import { ProductOptionValueModel } from './entities/productOptionValue.entity';

@Resolver(() => ProductOptionModel)
export class ProductOptionResolver {
  constructor(private readonly dataloadersService: DataloadersService) {}

  @ResolveField('optionValues', () => [ProductOptionValueModel])
  getOptionValues(
    @Parent() option: ProductOption,
  ): Promise<ProductOptionValue[]> {
    return this.dataloadersService.optionValuesByOptionIdLoader.load(option.id);
  }
}
