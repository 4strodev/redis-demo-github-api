import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './shared/services/logging/Logger';
import { NestJSLoggingAdapter } from './shared/services/logging/NestJSLoggingAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger: Logger = app.get(Logger);
  app.useLogger(new NestJSLoggingAdapter(logger));
  await app.listen(3000);
}
bootstrap();
