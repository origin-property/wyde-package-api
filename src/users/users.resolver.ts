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
import { User } from './dto/user.dto';
import { UsersService } from './users.service';
import { Loader } from '@strv/nestjs-dataloader';
import { UserLoader, UserLoaderFactory } from './UserLoader.factory';

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
    @Loader(UserLoaderFactory) units: UserLoader,
  ) {
    const result = await units.load(createdBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async updatedBy(
    @Parent() { updatedBy }: User,
    @Loader(UserLoaderFactory) units: UserLoader,
  ) {
    const result = await units.load(updatedBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async deletedBy(
    @Parent() { deletedBy }: User,
    @Loader(UserLoaderFactory) units: UserLoader,
  ) {
    if (!deletedBy) {
      return null;
    }

    const result = await units.load(deletedBy);
    return result?.values || null;
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
