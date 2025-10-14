import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@DataloaderProvider()
export class UserLoader {
  constructor(private readonly userService: UsersService) {}

  createDataloader() {
    return new DataLoader<string, User>(async (ids) =>
      this.userService.getUserWithIds(ids),
    );
  }
}
