import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginateInput {
  @Field(() => Int, {
    defaultValue: 1,
  })
  page: number;

  @Field(() => Int, {
    defaultValue: 10,
  })
  limit: number;
}

@ArgsType()
export class PaginateOffsetInput {
  @Field(() => Int, {
    defaultValue: 0,
  })
  offset: number;

  @Field(() => Int, {
    defaultValue: 10,
  })
  limit: number;
}
