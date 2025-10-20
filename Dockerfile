FROM oven/bun:1.3-alpine AS base

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat git
WORKDIR /app

COPY package.json bun.lock* ./

ENV CI=true
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build
RUN bun pm cache rm

FROM base AS release
RUN apk update && apk add --no-cache libc6-compat curl
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock* ./bun.lock

ENV CI=true NODE_ENV=production
RUN bun install --production --frozen-lockfile --ignore-scripts

COPY --from=builder /app/dist ./dist

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost:4000/health || exit 1

CMD ["bun", "run", "dist/main.js", "--verbose"]