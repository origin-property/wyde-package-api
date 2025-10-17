import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

type UserId = string;
type UserInfo = { id: UserId; values: User };
type UserLoader = LoaderFrom<UserLoaderFactory>;

@Injectable()
class UserLoaderFactory extends DataloaderFactory<UserId, UserInfo> {
  constructor(private readonly userService: UsersService) {
    super();
  }

  async load(ids: UserId[], context: ExecutionContext) {
    const results: User[] = await this.userService.getUserWithIds(ids);

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: UserInfo) {
    return entity.id;
  }
}

export { UserLoader, UserLoaderFactory };
