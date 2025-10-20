import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { User } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

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

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: PromotionUserInfo) {
    return entity.id;
  }
}

export { PromotionUserLoader, PromotionUserLoaderFactory };
