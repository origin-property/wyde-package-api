import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';

@ObjectType('ProductType')
export class ProductTypeModel extends BaseModel {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
