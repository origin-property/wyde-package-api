import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { Client } from 'ldapts';
import { UsersService } from '../users/users.service';
import {
  JwtPayload,
  RefreshTokenPayload,
} from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
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
    return this.usersService.findOne({ id: payload.id });
  }

  async signIn(username: string, password: string) {
    const isAuthenticated = await this.adAuth({ username, password });

    if (!isAuthenticated) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.usersService.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.genTokenPackage(user.id);
  }

  async genTokenPackage(userId: string) {
    const user = await this.usersService.findOne({ id: userId });

    const tokenData: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    const accessExpiresIn = parseInt(
      this.configService.get<string>('TOKEN_LIFE'),
      10,
    );
    const refreshExpiresIn = parseInt(
      this.configService.get<string>('REFRESH_TOKEN_LIFE'),
      10,
    );

    const accessToken = this.jwtService.sign(tokenData, {
      secret: this.configService.get<string>('TOKEN_SECRET'),
      expiresIn: accessExpiresIn,
    });

    const refreshTokendata: RefreshTokenPayload = {
      id: user.id,
    };

    const refreshToken = this.jwtService.sign(refreshTokendata, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
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
}
