import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { User } from '../../users/dto/user.dto';
import { UsersService } from '../../users/users.service';

type UserId = string;
type QuotationUserInfo = { id: UserId; values: User };
type QuotationUserLoader = LoaderFrom<QuotationUserLoaderFactory>;

@Injectable()
class QuotationUserLoaderFactory extends DataloaderFactory<
  UserId,
  QuotationUserInfo
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

  id(entity: QuotationUserInfo) {
    return entity.id;
  }
}

export { QuotationUserLoader, QuotationUserLoaderFactory };
