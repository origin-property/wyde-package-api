import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { BaseModel } from './baseModel.dto';

@ObjectType('ProductVariant')
export class ProductVariantModel extends BaseModel {
  @Field(() => String)
  sku: string;

  @Field(() => Float)
  budgetPrice: number;

  @Field(() => Float)
  sellingPrice: number;

  @Field(() => Int)
  stock: number;

  @Field(() => Boolean)
  isActive: boolean;
}
