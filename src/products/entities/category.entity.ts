import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';

@ObjectType('Category')
export class CategoryModel extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
