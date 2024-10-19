import { Injectable } from '@nestjs/common';
import { RedisClient } from '../redis-client/redis.client';
import { RedisClientType } from 'redis';
import dayjs from 'dayjs';
import { Logger } from '../logging/Logger';

@Injectable()
export class GithubCache {
  redisClient: RedisClientType;
  constructor(
    redisClient: RedisClient,
    private logger: Logger,
  ) {
    this.redisClient = redisClient.client;
  }
  public async getUsedLanguages(): Promise<Map<string, number> | undefined> {
    const exists = await this.redisClient.EXISTS('used_languages');
    if (exists === 0) {
      return;
    }

    this.logger.debug('getting cached github response');

    const languageUsage = new Map<string, number>();
    const response = await this.redisClient.HGETALL('used_languages');
    for (const [language, usage] of Object.entries(response)) {
      languageUsage.set(language, parseInt(usage));
    }

    return languageUsage;
  }

  public async setUsedLanguages(usedLanguages: Map<string, number>) {
    this.logger.debug('caching github response');
    const transactionalClient = this.redisClient.MULTI();
    try {
      await transactionalClient
        .HSET('used_languages', Object.fromEntries(usedLanguages.entries()))
        .EXPIREAT('used_languages', dayjs().add(30, 'minutes').unix())
        .EXEC();
    } catch (e) {
      transactionalClient.DISCARD();
      throw e;
    }
  }
}
