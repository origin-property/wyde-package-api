import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  nameTh: string;

  @Field(() => String)
  nameEn: string;
}
