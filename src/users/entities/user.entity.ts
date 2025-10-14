import { Base } from '@/shared/@types/base';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  employeeId: string;

  @Field(() => String, { nullable: true })
  firstnameThai: string;

  @Field(() => String, { nullable: true })
  lastnameThai: string;

  @Field(() => String, { nullable: true })
  firstnameEng: string;

  @Field(() => String, { nullable: true })
  lastnameEng: string;
}
