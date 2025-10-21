import { Paginate } from '@/shared/@types/paginate.entity';
import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { ProductModel } from './product.dto';

@ObjectType()
export class ProductPaginate extends PartialType(Paginate) {
  @Field(() => [ProductModel])
  items: ProductModel[];
}
