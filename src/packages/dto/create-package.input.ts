import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePackageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
