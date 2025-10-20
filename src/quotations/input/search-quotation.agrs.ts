import { PaginateInput } from '@/shared/@types/paginate.input';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchQuotationArgs extends PaginateInput {
  @Field(() => String, { nullable: true, description: 'ค้นหา' })
  searchText: string;
}
