FROM public.ecr.aws/docker/library/node:24-alpine AS base

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat git
WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./

ENV CI=true
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build
RUN pnpm store prune

FROM base AS release
RUN apk update && apk add --no-cache libc6-compat curl
WORKDIR /app

RUN npm install -g pnpm@latest

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

ENV CI=true NODE_ENV=production
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

COPY --from=builder /app/dist ./dist

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost:4000/health || exit 1

CMD ["node", "dist/main.js"]