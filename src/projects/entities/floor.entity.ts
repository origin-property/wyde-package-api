import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Floor {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  towerId: number;

  @Field(() => String, { nullable: true })
  projectId: string;

  @Field(() => String, { nullable: true })
  nameTh: string;

  @Field(() => String, { nullable: true })
  nameEn: string;
}
