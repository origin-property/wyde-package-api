import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateQuotationInput } from './create-quotation.input';

@InputType()
export class UpdateQuotationInput extends PartialType(CreateQuotationInput) {
  @Field(() => ID)
  id: string;
}
