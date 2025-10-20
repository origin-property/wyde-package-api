import { CurrentUser } from '@/shared/decorators/decorators';
import { User } from '@/users/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { GqlRefreshAuthGuard } from './guard/gql-refresh-auth.guard';
import { Public } from '../shared/decorators/public.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  async signIn(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.signIn(username, password);
  }

  @Public()
  @UseGuards(GqlRefreshAuthGuard)
  @Mutation(() => Auth)
  async refreshToken(@CurrentUser() user: User) {
    return this.authService.genTokenPackage(user.id);
  }
}
