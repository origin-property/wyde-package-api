import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateQuotationItemInput } from './create-quotation-item.input';

@InputType()
export class UpdateQuotationItemInput extends PartialType(
  CreateQuotationItemInput,
) {
  @Field(() => ID)
  id: string;
}
