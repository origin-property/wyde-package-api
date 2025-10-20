import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModelType {
  @Field()
  id: string;

  @Field({ nullable: true })
  nameTh: string;

  @Field({ nullable: true })
  nameEn: string;

  @Field({ nullable: true })
  code: string;
}
