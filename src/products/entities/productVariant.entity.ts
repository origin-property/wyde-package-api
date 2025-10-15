import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';

@ObjectType('ProductVariant')
export class ProductVariantModel extends BaseModel {
  @Field()
  sku: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;
}
