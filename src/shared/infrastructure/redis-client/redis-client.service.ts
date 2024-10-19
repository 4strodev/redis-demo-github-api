import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisClientService {
  private readonly _client: RedisClientType;
  constructor() {
    this._client = createClient();
  }

  get client(): RedisClientType {
    return this._client;
  }
}
