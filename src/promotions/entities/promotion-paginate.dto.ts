import { Paginate } from '@/shared/@types/paginate.entity';
import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { PromotionDto } from './promotion.dto';

@ObjectType('PromotionPaginate')
export class PromotionPaginateDto extends PartialType(Paginate) {
  @Field(() => [PromotionDto])
  items: PromotionDto[];
}
