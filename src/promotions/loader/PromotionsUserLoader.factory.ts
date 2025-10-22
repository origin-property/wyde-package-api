import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { User } from '../../users/dto/user.dto';
import { UsersService } from '../../users/users.service';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

type UserId = string;
type PromotionUserInfo = { id: UserId; values: User };
type PromotionUserLoader = LoaderFrom<PromotionUserLoaderFactory>;

@Injectable()
class PromotionUserLoaderFactory extends DataloaderFactory<
  UserId,
  PromotionUserInfo
> {
  constructor(private readonly userService: UsersService) {
    super();
  }

  async load(ids: UserId[], context: ExecutionContext) {
    const results: User[] = await this.userService.getUserWithIds(ids);
    return singleAggregateBy<UserId, User>(results, (item) => item.id);
  }

  id(entity: PromotionUserInfo) {
    return entity.id;
  }
}

export { PromotionUserLoader, PromotionUserLoaderFactory };
