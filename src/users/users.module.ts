import { AuthModule } from '@/auth/auth.module';
import { Role } from '@/database/entities/role.entity';
import { User } from '@/database/entities/user.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserLoaderFactory } from './UserLoader.factory';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [UsersService, UsersResolver, UserLoaderFactory],
  exports: [UsersService],
})
export class UsersModule {}
