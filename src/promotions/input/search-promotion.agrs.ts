import { PaginateInput } from '@/shared/@types/paginate.input';
import { PromotionKind, PromotionType } from '@/shared/enums/promotion.enum';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchPromotionArgs extends PaginateInput {
  @Field(() => PromotionKind, {
    nullable: true,
    description: 'ประเภทโปรโมชั่น: discount หรือ voucher',
  })
  kind: PromotionKind;

  @Field(() => PromotionType, {
    nullable: true,
  })
  type: PromotionType;
}
