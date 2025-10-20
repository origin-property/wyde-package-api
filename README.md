## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.


## Module Folder Structure
<sup>**NOTE:** this is only a recommendation you can always use your own approach as long as they work with
NestJS.</sup>

```
wyde-package-api/src/{module-name}:.
├─── interface
│     {something}.interface.ts
├─── enum
│     {something}.enum.ts
├─── dto
│     {something}.dto.ts
├─── input
│     {something}Loader.factory.ts
├─── loader
│     {something}.input.ts
├─── test
│     {something}.spec.ts
│ {module-name}.module.ts
│ {module-name}.service.ts
│ {module-name}.resolver.ts
```

## Commitizen

```bash
$ pnpm run commit
```

## Environment Variables

```bash
TZ=Asia/Bangkok
APP_PORT=4000

TOKEN_SECRET=wyde-package
TOKEN_LIFE=604800
REFRESH_TOKEN_SECRET=wyde-package-refresh
REFRESH_TOKEN_LIFE=604800

GOD_PASSWORD=

AD_URL=
AD_BASE_DN=

DB_WYDE_HOST=
DB_WYDE_PORT=
DB_WYDE_USERNAME=
DB_WYDE_PASSWORD=
DB_WYDE_NAME=

DB_MYORIGIN_HOST=
DB_MYORIGIN_PORT=
DB_MYORIGIN_USERNAME=
DB_MYORIGIN_PASSWORD=
DB_MYORIGIN_NAME=

DB_CRM_HOST=
DB_CRM_NAME=
DB_CRM_USERNAME=
DB_CRM_PASSWORD=
DB_CRM_PORT=

REDIS_HOST=
REDIS_PORT=
REDIS_DEFAULT_TTL=
REDIS_USERNAME=
REDIS_PASSWORD=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```
