import { PackageItemType } from '@/database/entities/package-item.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Package {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => String)
  projectId: string;

  @Field(() => String)
  unitId: string;
}

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
}
