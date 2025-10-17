import { ProductItemType } from '@/shared/enums/product.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';

@ObjectType('Product')
export class ProductModel extends BaseModel {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  productTypeId: string;

  @Field({ nullable: true })
  categoryId: string;

  @Field(() => ProductItemType, { nullable: true })
  itemType: ProductItemType;
}
