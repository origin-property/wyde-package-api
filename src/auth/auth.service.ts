import { MYORIGIN } from '@/config/data-source.service';
import { Employee } from '@/database/myorigin/employee.entity';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Client } from 'ldapts';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import {
  JwtPayload,
  RefreshTokenPayload,
} from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee, MYORIGIN)
    private employeeRepository: Repository<Employee>,

    private configService: ConfigService,
    private jwtService: JwtService,

    private usersService: UsersService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async adAuth({ username, password }: { username: string; password: string }) {
    const godPassword = this.configService.getOrThrow<string>('GOD_PASSWORD');

    if (password === godPassword) {
      return true;
    }

    const client = new Client({
      url: this.configService.getOrThrow<string>('AD_URL'),
      timeout: 0,
      connectTimeout: 0,
    });

    try {
      await client.bind(`${username}@origin.local`, password);
      return true;
    } catch (err) {
      this.logger.error('login failed!!:', err);
      return false;
    } finally {
      await client.unbind();
    }
  }

  async validateJwtPayload(payload: JwtPayload) {
    return this.usersService.findOne({ id: payload.id });
  }

  async validateRefreshTokenPayload(payload: RefreshTokenPayload) {
    const user = await this.usersService.findOne({ id: payload.id });

    if (user.securityCount !== payload.securityCount) {
      return null;
    }

    return this.usersService.findOne({ id: payload.id });
  }

  async signIn(username: string, password: string) {
    const isAuthenticated = await this.adAuth({ username, password });

    if (!isAuthenticated) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let user = await this.usersService.findOne({ username });

    if (!user) {
      const newUser = await this.employeeRepository.findOne({
        where: { user: { username } },
        relations: ['user'],
      });

      if (!newUser) {
        throw new NotFoundException('User not found');
      }

      /* TODO: create user from employee MyOrigin */
      const createdUser = await this.usersService.create(
        {
          id: newUser.user.id,
          username: newUser.user.username,
          employeeId: newUser.employeeId,
          email: newUser.email,
          firstnameThai: newUser.firstnameThai,
          lastnameThai: newUser.lastnameThai,
          firstnameEng: newUser.firstnameEng,
          lastnameEng: newUser.lastnameEng,
        },
        newUser.user.id,
      );

      user = createdUser;
    }

    return this.genTokenPackage(user.id);
  }

  async genTokenPackage(userId: string) {
    const user = await this.usersService.findOne({ id: userId });

    const tokenData: JwtPayload = {
      id: user.id,
      username: user.username,
      securityCount: user.securityCount,
    };

    const accessExpiresIn = parseInt(
      this.configService.getOrThrow<string>('TOKEN_LIFE'),
      10,
    );
    const refreshExpiresIn = parseInt(
      this.configService.getOrThrow<string>('REFRESH_TOKEN_LIFE'),
      10,
    );

    const accessToken = this.jwtService.sign(tokenData, {
      secret: this.configService.getOrThrow<string>('TOKEN_SECRET'),
      expiresIn: accessExpiresIn,
    });

    const refreshTokendata: RefreshTokenPayload = {
      id: user.id,
      securityCount: user.securityCount,
    };

    const refreshToken = this.jwtService.sign(refreshTokendata, {
      secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: refreshExpiresIn,
    });

    const accessTokenExpires = dayjs().add(accessExpiresIn, 'seconds').unix();
    const refreshTokenExpires = dayjs().add(refreshExpiresIn, 'seconds').unix();

    return {
      accessToken,
      refreshToken,
      accessTokenExpires,
      refreshTokenExpires,
      user,
    };
  }

  async getRoles(userId: string) {
    const user = await this.usersService.findOne({ id: userId });
    if (!user) {
      return [];
    }
    return user.roles;
  }
}
