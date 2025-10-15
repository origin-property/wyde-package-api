import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Model {
  @Field()
  id: string;

  @Field({ nullable: true })
  projectId: string;

  @Field({ nullable: true })
  modelTypeId: string;

  @Field({ nullable: true })
  nameTh: string;

  @Field({ nullable: true })
  nameEn: string;

  @Field({ nullable: true })
  shortName: string;
}
