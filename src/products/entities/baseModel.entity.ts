import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  updatedBy?: string;
}
