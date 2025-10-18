import { ProductItemType } from '@/shared/enums/product.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './baseModel.dto';

@ObjectType('Product')
export class ProductModel extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  productTypeId: string;

  @Field(() => String, { nullable: true })
  categoryId: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => ProductItemType, { nullable: true })
  itemType: ProductItemType;
}
