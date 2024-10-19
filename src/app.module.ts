import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonLogger } from './shared/services/logging/winston-logger.service';
import { Logger } from './shared/services/logging/Logger';
import { RedisClientService } from './shared/infrastructure/redis-client/redis-client.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: Logger, useClass: WinstonLogger, scope: Scope.DEFAULT },
    RedisClientService,
  ],
})
export class AppModule {}
