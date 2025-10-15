import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';

@ObjectType('Category')
export class CategoryModel extends BaseModel {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
