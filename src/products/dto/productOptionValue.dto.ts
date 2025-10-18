import { ObjectType, Field, Float } from '@nestjs/graphql';
// import { ProductOptionModel } from './productOption.entity';
import { BaseModel } from './baseModel.dto';

@ObjectType('ProductOptionValue')
export class ProductOptionValueModel extends BaseModel {
  @Field(() => String)
  value: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  image?: string;

  // @Field(() => ProductOptionModel)
  // productOption: ProductOptionModel;
}
