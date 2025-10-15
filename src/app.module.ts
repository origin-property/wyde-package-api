import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataloaderModule } from '@tracworx/nestjs-dataloader';
import { S3Module } from 'nestjs-s3';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GqlAuthGuard } from './auth/guard/gql-auth.guard';
import { GqlRolesGuard } from './auth/guard/gql-roles.guard';
import { CRM, MYORIGIN, TypeOrmConfigService } from './config/data-source.service';
import { FilesModule } from './files/files.module';
import { HealthModule } from './health/health.module';
import { PackagesModule } from './packages/packages.module';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './roles/roles.module';
import { DateScalar } from './shared/scalars/date.scalar';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DataloaderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forRootAsync({
      name: MYORIGIN,
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forRootAsync({
      name: CRM,
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        graphiql: true,
        sortSchema: true,
        playground: true,
        debug: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.getOrThrow<string>(
              'AWS_SECRET_ACCESS_KEY',
            ),
          },
          region: configService.getOrThrow<string>('AWS_REGION'),
          forcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    PackagesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    UploadModule,
    FilesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DateScalar,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GqlRolesGuard,
    },
  ],
})
export class AppModule { }
