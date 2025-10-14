import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
// import { AuthResolver } from './auth.resolver';
import { MYORIGIN } from '@/config/data-source.service';
import { Employee } from '@/database/myorigin/employee.entity';
import { User } from '@/database/myorigin/user.entity';
import { RolesModule } from '@/roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee], MYORIGIN),
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
  providers: [AuthService, AuthResolver],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
