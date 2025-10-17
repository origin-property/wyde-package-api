import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  createdBy?: string;

  @Field(() => String, { nullable: true })
  updatedBy?: string;
}
