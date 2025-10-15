import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';
// import { ProductOptionModel } from './productOption.entity';
// import { ProductVariantModel } from './productVariant.entity';

@ObjectType('Product')
export class ProductModel extends BaseModel {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  // @Field(() => [ProductOptionModel])
  // options: ProductOptionModel[];

  // @Field(() => [ProductVariantModel])
  // variants: ProductVariantModel[];
}
