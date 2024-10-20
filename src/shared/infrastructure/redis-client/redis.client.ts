import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigProvider } from '../../config-provider';

@Injectable()
export class RedisClient
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  private readonly _client: RedisClientType;
  constructor(private readonly configProvider: ConfigProvider) {
    const redisUrl = this.configProvider.config.REDIS_URL;
    this._client = createClient({
      url: redisUrl,
    });
  }

  async onApplicationBootstrap(): Promise<any> {
    await this._client.connect();
  }

  get client(): RedisClientType {
    return this._client;
  }

  async beforeApplicationShutdown(): Promise<any> {
    await this._client.disconnect();
  }
}
