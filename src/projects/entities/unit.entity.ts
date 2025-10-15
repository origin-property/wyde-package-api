import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Unit {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  unitNumber: string;

  @Field(() => String, { nullable: true })
  houseNumber: string;

  @Field(() => String)
  projectId: string;
}
