import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductOptionValueModel } from './productOptionValue.entity';
import { BaseModel } from './baseModel.entity';

@ObjectType('VariantAttribute')
export class VariantAttributeModel extends BaseModel {
  @Field(() => ID)
  declare id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => ProductOptionValueModel)
  optionValue: ProductOptionValueModel;
}
