import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { User } from './entities/user.entity';
import { UserLoader } from './users.loader';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users', description: 'ข้อมูลผู้ใช้งานทั้งหมด' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, {
    name: 'user',
    description: 'ข้อมูลผู้ใช้งานตามรหัสผู้ใช้งาน',
  })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne({ id });
  }

  @ResolveField(() => User, { nullable: true })
  async createdBy(
    @Parent() { createdBy }: User,
    @Loader(UserLoader) loader: DataLoader<string, User>,
  ) {
    return createdBy ? loader.load(createdBy) : null;
  }

  @ResolveField(() => User, { nullable: true })
  async updatedBy(
    @Parent() { updatedBy }: User,
    @Loader(UserLoader) loader: DataLoader<string, User>,
  ) {
    return updatedBy ? loader.load(updatedBy) : null;
  }

  @ResolveField(() => User, { nullable: true })
  async deletedBy(
    @Parent() { deletedBy }: User,
    @Loader(UserLoader) loader: DataLoader<string, User>,
  ) {
    return deletedBy ? loader.load(deletedBy) : null;
  }
}
