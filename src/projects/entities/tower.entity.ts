import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tower {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  projectId: string;

  @Field(() => String, { nullable: true })
  nameTh: string;

  @Field(() => String, { nullable: true })
  nameEn: string;
}
