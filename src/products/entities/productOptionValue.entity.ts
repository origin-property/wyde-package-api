import { ObjectType, Field, Float } from '@nestjs/graphql';
// import { ProductOptionModel } from './productOption.entity';
import { BaseModel } from './baseModel.entity';

@ObjectType('ProductOptionValue')
export class ProductOptionValueModel extends BaseModel {
  @Field()
  value: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  image?: string;

  // @Field(() => ProductOptionModel)
  // productOption: ProductOptionModel;
}
