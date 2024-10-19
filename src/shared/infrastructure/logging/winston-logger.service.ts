import { Injectable } from '@nestjs/common';
import { Levels, Logger, LogMetadata } from './Logger';
import * as winston from 'winston';

@Injectable()
export class WinstonLogger extends Logger {
  private logger: winston.Logger;
  private winstonLevels = {
    [Levels.ERROR]: 'error',
    [Levels.WARN]: 'warn',
    [Levels.INFO]: 'info',
    [Levels.DEBUG]: 'debug',
  };

  constructor() {
    super();
    this.logger = winston.createLogger({
      levels: {
        error: Levels.ERROR,
        warn: Levels.WARN,
        info: Levels.INFO,
        debug: Levels.DEBUG,
      },
      transports: [
        new winston.transports.File({
          level: 'info',
          filename: './logs.txt',
          options: {
            flags: 'w',
          },
          format: winston.format.json(),
        }),
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.json(),
        }),
      ],
    });
  }

  log(level: Levels, message: string, metadata?: LogMetadata): void {
    this.logger.log(this.winstonLevels[level], message, metadata);
  }
}
