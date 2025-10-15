import { PackageItemType } from '@/database/entities/package-item.entity';
import { CreateFileInput } from '@/files/dto/create-file.input';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(PackageItemType, {
  name: 'PackageItemType',
});

@InputType()
export class PackageItemInput {
  @Field(() => String)
  productVariantId: string;

  @Field(() => PackageItemType)
  type: PackageItemType;

  @Field()
  quantity: number;

  @Field()
  specialPrice: number;
}

@InputType()
export class CreatePackageInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  projectId: string;

  @Field(() => String)
  unitId: string;

  @Field(() => [PackageItemInput])
  items: PackageItemInput[];

  @Field(() => [CreateFileInput])
  images: CreateFileInput[];

  @Field(() => Boolean)
  isActive: boolean;
}
