import { ObjectType, Field } from '@nestjs/graphql';
// import { ProductOptionValueModel } from './productOptionValue.entity';
import { ProductModel } from './product.dto';
import { BaseModel } from './baseModel.dto';

@ObjectType('ProductOption')
export class ProductOptionModel extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => ProductModel)
  product: ProductModel;

  // @Field(() => [ProductOptionValueModel])
  // optionValues: ProductOptionValueModel[];
}
