import { LoggerService } from '@nestjs/common';
import { Logger } from './Logger';

export class NestJSLoggingAdapter implements LoggerService {
  constructor(private logger: Logger) {}

  debug(message: any, ...optionalParams: any[]): any {
    this.logger.debug(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    this.logger.error(message, optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]): any {
    this.logger.error(message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.logger.info(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    this.logger.debug(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.logger.warn(message, optionalParams);
  }
}
