import { User } from '@/database/myorigin/user.entity';
import { CurrentUser } from '@/shared/decorators/decorators';
import { Public } from '@/shared/decorators/public.decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshAuthGuard } from './guard/refreash-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.authService.signIn(username, password);
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@CurrentUser() user: User) {
    return this.authService.genTokenPackage(user.id);
  }
}
