import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'node:path';

import 'dotenv/config';

export const CRM = 'CRM';
export const MYORIGIN = 'MYORIGIN';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    const baseConfig: TypeOrmModuleOptions = {
      synchronize: false,
      requestTimeout: 300000,
      pool: {
        min: 1,
        max: 1,
      },
    };

    switch (connectionName) {
      case MYORIGIN:
        return {
          ...baseConfig,
          name: connectionName,
          type: 'mssql',
          host: this.configService.get<string>('DB_MYORIGIN_HOST'),
          port: parseInt(
            this.configService.get<string>('DB_MYORIGIN_PORT'),
            10,
          ),
          username: this.configService.get<string>('DB_MYORIGIN_USERNAME'),
          password: this.configService.get<string>('DB_MYORIGIN_PASSWORD'),
          database: this.configService.get<string>('DB_MYORIGIN_NAME'),
          entities: [join(__dirname, '../database/myorigin/**/*{.ts,.js}')],
          logging: ['error'],
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        };

      case CRM:
        return {
          ...baseConfig,
          name: connectionName,
          type: 'mssql',
          host: this.configService.get<string>('DB_CRM_HOST'),
          port: parseInt(this.configService.get<string>('DB_CRM_PORT'), 10),
          username: this.configService.get<string>('DB_CRM_USERNAME'),
          password: this.configService.get<string>('DB_CRM_PASSWORD'),
          database: this.configService.get<string>('DB_CRM_NAME'),
          entities: [join(__dirname, '../database/crm/**/*{.ts,.js}')],
          logging: ['error'],
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        };

      default:
        return {
          type: 'postgres',
          host: this.configService.get<string>('DB_WYDE_HOST'),
          username: this.configService.get<string>('DB_WYDE_USERNAME'),
          password: this.configService.get<string>('DB_WYDE_PASSWORD'),
          database: this.configService.get<string>('DB_WYDE_NAME'),
          port: parseInt(this.configService.get<string>('DB_WYDE_PORT'), 10),
          synchronize: false,
          logging: ['error'],
          entities: [
            join(__dirname, '../database/entities/**/*.entity{.ts,.js}'),
          ],
          migrations: [join(__dirname, '../database/migrations/**/*{.ts,.js}')],
          subscribers: [
            join(__dirname, '../database/subscribers/**/*.subscriber{.ts,.js}'),
          ],
        };
    }
  }
}
