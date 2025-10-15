import { InputType, Field, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsUUID,
} from 'class-validator';

// DTO สำหรับรูปภาพ (เป็นส่วนหนึ่งของ Variant)
@InputType()
class CreateVariantImageInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  fileCurName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  filePrevName?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  fileExtension: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  filePath: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  altText?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  isMain: boolean;

  @Field({ defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder: number;
}

// DTO สำหรับค่าของตัวเลือก (เช่น "สีแดง", "ขนาด M")
@InputType()
class CreateOptionValueInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  value: string;

  @Field(() => Float, { nullable: true, defaultValue: 0.0 })
  @IsNumber()
  @IsOptional()
  price: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  image?: string;
}

// DTO สำหรับตัวเลือก (เช่น "สี", "ขนาด")
@InputType()
class CreateProductOptionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [CreateOptionValueInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionValueInput)
  values: CreateOptionValueInput[];
}

// DTO สำหรับสินค้าย่อย (SKU)
@InputType()
class CreateProductVariantInput {
  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field({ defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  stock: number;

  // รับเป็น Array ของชื่อ value เช่น ["สีแดง", "ขนาด M"]
  // Service จะนำชื่อเหล่านี้ไปหา ID อีกครั้ง
  @Field(() => [String], { nullable: true, defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  optionValues: string[];

  @Field(() => [CreateVariantImageInput], { nullable: true, defaultValue: [] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantImageInput)
  images: CreateVariantImageInput[];
}

// DTO หลักสำหรับ Mutation `createProduct`
@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => [CreateProductOptionInput], { nullable: true, defaultValue: [] }) // 1. อนุญาตให้เป็น null
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionInput)
  @IsOptional() // 2. ไม่บังคับให้มี key นี้
  options: CreateProductOptionInput[];

  @Field(() => [CreateProductVariantInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantInput)
  variants: CreateProductVariantInput[];

  @Field(() => String, { description: 'The UUID of the product type' })
  @IsUUID('4')
  @IsNotEmpty()
  productTypeId: string;

  @Field(() => String, { description: 'The UUID of the product category' })
  @IsUUID('4')
  @IsNotEmpty()
  categoryId: string;
}
