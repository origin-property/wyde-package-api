import { PaginateInput } from '@/shared/@types/paginate.input';
import { PromotionKind, PromotionType } from '@/shared/enums/promotion.enum';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchPromotionArgs extends PaginateInput {
  @Field(() => [PromotionKind], {
    nullable: true,
    description: 'ประเภทโปรโมชั่น: ส่วนลด, voucher หรือ รหัสโค้ด',
  })
  kind: PromotionKind[];

  @Field(() => [PromotionType], {
    nullable: true,
    description: 'ประเภทโปรโมชั่น: ส่วนลดเป็นจำนวนเงิน หรือ ส่วนลดเป็นร้อยละ',
  })
  type: PromotionType[];

  @Field(() => Boolean, {
    nullable: true,
    description: 'สถานะโปรโมชั่น: true หรือ false',
  })
  isActive: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'ค้นหาด้วยชื่อ, รหัสโค้ด, รายละเอียด',
  })
  searchText: string;
}
