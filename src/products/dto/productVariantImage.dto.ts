import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './baseModel.dto';
// import { ProductVariantModel } from './productVariant.entity';

@ObjectType('ProductVariantImage')
export class ProductVariantImageModel extends BaseModel {
  @Field(() => String)
  fileCurName: string;

  @Field(() => String)
  filePrevName: string;

  @Field(() => String)
  fileExtension: string;

  @Field(() => String, { nullable: true })
  altText: string;

  @Field(() => Boolean)
  isMain: boolean;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => String)
  filePath: string;

  @Field(() => String)
  fileBucket: string;

  // @Field(() => ProductVariantModel)
  // variant: ProductVariantModel;
}
