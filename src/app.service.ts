import { Injectable } from '@nestjs/common';
import { Logger } from './shared/services/logging/Logger';
import { RedisClientService } from './shared/infrastructure/redis-client/redis-client.service';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,
    private readonly client: RedisClientService,
  ) {}

  getHello(): string {
    this.logger.debug(
      'a debug message that should not be displayed on the logs file',
      { more: 'metadata' },
    );
    return 'Hello World!';
  }
}
