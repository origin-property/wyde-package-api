import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './baseModel.entity';
// import { ProductVariantModel } from './productVariant.entity';

@ObjectType('ProductVariantImage')
export class ProductVariantImageModel extends BaseModel {
  @Field({ nullable: true })
  fileCurName: string;

  @Field({ nullable: true })
  filePrevName: string;

  @Field({ nullable: true })
  fileExtension: string;

  @Field({ nullable: true })
  altText: string;

  @Field()
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
