import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IPaginateLinks {
  @Field({ nullable: true, description: 'ลิงค์หน้าแรก' })
  first?: string;

  @Field({ nullable: true, description: 'ลิงค์หน้าก่อนหน้า' })
  previous?: string;

  @Field({ nullable: true, description: 'ลิงค์หน้าถัดไป' })
  next?: string;

  @Field({ nullable: true, description: 'ลิงค์หน้าสุดท้าย' })
  last?: string;
}

@ObjectType()
export class IPaginateMeta {
  @Field({ nullable: true, description: 'จำนวนรายการทั้งหมด' })
  totalItems?: number;

  @Field({ description: 'จำนวนรายการที่มีอยู่ในหน้านี้' })
  itemCount: number;

  @Field({ description: 'จำนวนรายการที่แสดงในหน้านี้' })
  itemsPerPage: number;

  @Field({ nullable: true, description: 'จำนวนหน้าทั้งหมด' })
  totalPages?: number;

  @Field({ description: 'หน้าปัจจุบัน' })
  currentPage: number;
}

@ObjectType()
export class Paginate {
  @Field(() => IPaginateMeta, { description: 'ข้อมูลการจัดการหน้า' })
  meta: IPaginateMeta;

  @Field(() => IPaginateLinks, {
    nullable: true,
    description: 'ลิงค์หน้า',
  })
  links: IPaginateLinks;
}
