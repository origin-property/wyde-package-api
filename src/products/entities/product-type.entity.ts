import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';

@ObjectType('ProductType')
export class ProductTypeModel extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
