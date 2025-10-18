import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { DataloadersService } from './dataloaders/dataloaders.service';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductOptionModel } from './dto/productOption.dto';
import { ProductOptionValueModel } from './dto/productOptionValue.dto';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { OptionByIdLoader } from './dataloaders/option-by-id.loader';

@Resolver(() => ProductOptionValueModel)
export class ProductOptionValueResolver {
  constructor(private readonly dataloadersService: DataloadersService) {}

  @ResolveField('productOption', () => ProductOptionModel)
  getProductOption(
    @Parent() value: ProductOptionValue,
    @Loader(OptionByIdLoader) loader: DataLoader<string, ProductOption>,
  ): Promise<ProductOption> {
    return loader.load(value.productOptionId);
  }
}
