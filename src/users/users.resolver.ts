import { Role } from '@/roles/entities/role.entity';
import { CurrentUser } from '@/shared/decorators/decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
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

  @Roles(['admin'])
  @Query(() => [User], { name: 'users', description: 'ข้อมูลผู้ใช้งานทั้งหมด' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'me', description: 'ข้อมูลผู้ใช้งานปัจจุบัน' })
  async me(@CurrentUser() user: User) {
    return this.usersService.findOne({ id: user.id });
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

  @ResolveField(() => [Role])
  async roles(@Parent() user: User) {
    if (user.roles) {
      return user.roles;
    }

    const userWithRoles = await this.usersService.findOne({ id: user.id });
    return userWithRoles.roles || [];
  }
}
