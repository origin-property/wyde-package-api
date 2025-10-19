import { PackageItemType } from '@/database/entities/package-item.entity';
import {
  InputType,
  Field,
  registerEnumType,
  PartialType,
  OmitType,
} from '@nestjs/graphql';
import {
  CreateProductInput,
  CreateVariantImageInput,
} from './create-product.input';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

registerEnumType(PackageItemType, {
  name: 'PackageItemType',
});

@InputType()
export class PackageItemInput {
  @Field(() => String)
  @IsUUID('4')
  @IsNotEmpty()
  productVariantId: string;

  @Field(() => PackageItemType)
  @IsEnum(PackageItemType)
  @IsNotEmpty()
  type: PackageItemType;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  specialPrice: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  packageSeq: number;
}

@InputType()
export class CreatePackageInput extends PartialType(
  OmitType(
    CreateProductInput,
    ['options', 'variants', 'productTypeId', 'categoryId'],
    InputType,
  ),
) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  modelId: string;

  @Field(() => [PackageItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageItemInput)
  @IsNotEmpty()
  items: PackageItemInput[];

  @Field(() => [CreateVariantImageInput])
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantImageInput)
  images: CreateVariantImageInput[];
}
