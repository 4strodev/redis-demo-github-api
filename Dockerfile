FROM node:20-alpine3.18 AS base

## Preparing pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g pnpm

FROM base AS build

WORKDIR /src
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --P
RUN pnpm build


FROM node:20-alpine3.18
WORKDIR /app
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/dist ./dist
EXPOSE 3000
ENTRYPOINT ["node", "dist/main.js"]
