import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { DataloadersService } from './dataloaders/dataloaders.service';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductOptionModel } from './entities/productOption.entity';
import { ProductOptionValueModel } from './entities/productOptionValue.entity';

@Resolver(() => ProductOptionValueModel)
export class ProductOptionValueResolver {
  constructor(private readonly dataloadersService: DataloadersService) {}

  @ResolveField('productOption', () => ProductOptionModel)
  getProductOption(
    @Parent() value: ProductOptionValue,
  ): Promise<ProductOption> {
    return this.dataloadersService.productOptionByIdLoader.load(
      value.productOptionId,
    );
  }
}
