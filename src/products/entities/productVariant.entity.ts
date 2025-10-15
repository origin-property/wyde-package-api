import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';
// import { ProductModel } from './product.entity';
// import { ProductVariantImageModel } from './productVariantImage.entity';
// import { ProductOptionValueModel } from './productOptionValue.entity';

@ObjectType('ProductVariant')
export class ProductVariantModel extends BaseModel {
  @Field()
  sku: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;

  // @Field(() => ProductModel)
  // product: ProductModel;

  // @Field(() => [ProductVariantImageModel])
  // images: ProductVariantImageModel[];

  // @Field(() => [ProductOptionValueModel])
  // optionValues: ProductOptionValueModel[];
}
