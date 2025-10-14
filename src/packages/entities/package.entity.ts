import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Package {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
