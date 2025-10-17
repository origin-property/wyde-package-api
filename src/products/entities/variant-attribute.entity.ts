import { ObjectType, Field } from '@nestjs/graphql';
import { ProductOptionValueModel } from './productOptionValue.entity';
import { BaseModel } from './baseModel.entity';

@ObjectType('VariantAttribute')
export class VariantAttributeModel extends BaseModel {
  @Field()
  declare id: string;

  @Field()
  name: string;

  @Field(() => ProductOptionValueModel)
  optionValue: ProductOptionValueModel;
}
