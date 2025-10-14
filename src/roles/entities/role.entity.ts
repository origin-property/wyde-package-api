import { Base } from '@/shared/@types/base';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Role extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;
}
