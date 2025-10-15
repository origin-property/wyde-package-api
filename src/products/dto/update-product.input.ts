import { CreateProductInput } from './create-product.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

// ใช้ PartialType เพื่อสืบทอด Field ทั้งหมดจาก CreateProductInput
// แต่ทำให้ทุก Field เป็น Optional โดยอัตโนมัติ
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
