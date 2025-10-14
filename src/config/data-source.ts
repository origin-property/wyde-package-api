import 'dotenv/config';
import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_WYDE_HOST,
  port: parseInt(process.env.DB_WYDE_PORT || '5432', 10),
  username: process.env.DB_WYDE_USERNAME,
  password: process.env.DB_WYDE_PASSWORD,
  database: process.env.DB_WYDE_NAME,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, '../database/entities/**/*{.ts,.js}')],
  migrations: [join(__dirname, '../database/migrations/*.ts')],
  subscribers: [],
});
