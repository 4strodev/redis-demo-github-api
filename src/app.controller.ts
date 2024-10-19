import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from './shared/services/logging/Logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('New request incoming', { key: 'value' });
    return this.appService.getHello();
  }
}
