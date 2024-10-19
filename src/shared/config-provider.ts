import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

export class Config {
  GH_TOKEN: string = '';
  REDIS_URL: string = '';

  public getAttribute(property: string): any {
    return (this as any)[property];
  }

  public setAttribute(property: string, value: any): void {
    (this as any)[property] = value;
  }
}

@Injectable()
export class ConfigProvider {
  private _config?: Config;
  get config(): Config {
    if (!this._config) {
      config();
      this._config = new Config();
      for (const key of Object.keys(this._config)) {
        const value = process.env[key];
        if (!value) {
          throw new Error(`env variable ${key} not defined`);
        }

        this._config.setAttribute(key, value);
      }
    }

    return this._config;
  }
}
