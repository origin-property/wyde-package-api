import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class FindAllProductsInput {
  @Field(() => String, { nullable: true, description: 'คำค้นหา' })
  @IsString()
  @IsOptional()
  searchText?: string;

  @Field(() => [String], {
    nullable: 'itemsAndList',
    description: 'รหัสหมวดหมู่สินค้า',
  })
  @IsArray()
  @IsOptional()
  categoryIds?: string[];

  @Field(() => Int, {
    nullable: true,
    defaultValue: 1,
    description: 'หน้าปัจจุบัน',
  })
  @Min(1)
  @IsOptional()
  page?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
    description: 'จำนวนรายการต่อหน้า',
  })
  @Min(1)
  @IsOptional()
  limit?: number;
}
