import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  CreateProductOptionInput,
  CreateProductVariantInput,
} from './create-product.input';

@InputType()
class UpdateVariantDataInput {
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  price?: number;
  @Field({ nullable: true }) @IsNumber() @IsOptional() stock?: number;
}

@InputType()
class UpdateProductVariantInput {
  @Field(() => ID) @IsUUID() @IsNotEmpty() id: string;
  @Field(() => UpdateVariantDataInput)
  @ValidateNested()
  @Type(() => UpdateVariantDataInput)
  data: UpdateVariantDataInput;
}

@InputType()
export class UpdateProductInput {
  @Field(() => ID) @IsUUID() @IsNotEmpty() id: string;

  @Field({ nullable: true }) @IsString() @IsOptional() name?: string;
  @Field({ nullable: true }) @IsString() @IsOptional() description?: string;
  @Field({ nullable: true }) @IsUUID() @IsOptional() productTypeId?: string;
  @Field({ nullable: true }) @IsUUID() @IsOptional() categoryId?: string;

  @Field(() => [CreateProductOptionInput], { nullable: true })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionInput)
  createOptions?: CreateProductOptionInput[];
  @Field(() => [CreateProductVariantInput], { nullable: true })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantInput)
  createVariants?: CreateProductVariantInput[];
  @Field(() => [UpdateProductVariantInput], { nullable: true })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantInput)
  updateVariants?: UpdateProductVariantInput[];
  @Field(() => [ID], { nullable: true })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  deleteOptionIds?: string[];
  @Field(() => [ID], { nullable: true })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  deleteVariantIds?: string[];
}
