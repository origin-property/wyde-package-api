import { Paginate } from '@/shared/@types/paginate.entity';
import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Quotation } from './quotation.entity';

@ObjectType()
export class QuotationPaginate extends PartialType(Paginate) {
  @Field(() => [Quotation])
  items: Quotation[];
}
