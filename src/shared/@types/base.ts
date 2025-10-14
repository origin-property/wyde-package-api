import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Base {
  createdBy: string;
  updatedBy: string;
  deletedBy: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
