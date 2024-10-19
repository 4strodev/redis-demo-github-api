import { Global, Module, Scope } from '@nestjs/common';
import { Logger } from './infrastructure/logging/Logger';
import { WinstonLogger } from './infrastructure/logging/winston-logger.service';
import { RedisClient } from './infrastructure/redis-client/redis.client';
import { GithubService } from './infrastructure/github/github.service';
import { GithubApi } from './infrastructure/github/github-api';
import { GithubCache } from './infrastructure/github/github-cache';

@Global()
@Module({
  imports: [],
  providers: [
    { provide: Logger, useClass: WinstonLogger, scope: Scope.DEFAULT },
    RedisClient,
    GithubService,
    GithubApi,
    GithubCache,
  ],
  exports: [RedisClient, Logger, GithubService],
})
export class SharedModule {}
