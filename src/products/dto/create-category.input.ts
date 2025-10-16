import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'กรุณาระบุชื่อหมวดหมู่' })
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => ID)
  @IsUUID('4')
  @IsNotEmpty({ message: 'กรุณาระบุ ID ของประเภทสินค้า' })
  productTypeId: string;
}
