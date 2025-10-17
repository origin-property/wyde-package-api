import { PackageItemType } from '@/database/entities/package-item.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PackageItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  productVariantId: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  specialPrice: number;

  @Field(() => PackageItemType)
  type: PackageItemType;

  @Field(() => Number)
  seq: number;

  @Field(() => Number)
  packageSeq: number;
}
