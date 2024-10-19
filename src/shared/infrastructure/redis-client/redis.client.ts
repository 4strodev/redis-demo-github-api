import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisClient
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  private readonly _client: RedisClientType;
  constructor() {
    this._client = createClient();
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
