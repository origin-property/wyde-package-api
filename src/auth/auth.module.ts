import { MYORIGIN } from '@/config/data-source.service';
import { ApiKey } from '@/database/entities/api-key.entity';
import { Employee } from '@/database/myorigin/employee.entity';
import { User } from '@/database/myorigin/user.entity';
import { RolesModule } from '@/roles/roles.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ApiKeyService } from './api-key.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee], MYORIGIN),
    TypeOrmModule.forFeature([ApiKey]),
    UsersModule,
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('TOKEN_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>('TOKEN_LIFE'),
            10,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    AuthResolver,
    JwtStrategy,
    JwtRefreshStrategy,
    ApiKeyService,
  ],
  exports: [AuthService, JwtModule, ApiKeyService],
  controllers: [AuthController],
})
export class AuthModule {}
