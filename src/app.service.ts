import { Injectable } from '@nestjs/common';
import { Logger } from './shared/infrastructure/logging/Logger';
import { RedisClient } from './shared/infrastructure/redis-client/redis.client';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,
    private readonly client: RedisClient,
  ) {}

  getHello(): string {
    this.logger.debug(
      'a debug message that should not be displayed on the logs file',
      { more: 'metadata' },
    );
    return 'Hello World!';
  }
}
