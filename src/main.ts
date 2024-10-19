import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './shared/infrastructure/logging/Logger';
import { NestJSLoggingAdapter } from './shared/infrastructure/logging/NestJSLoggingAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger: Logger = app.get(Logger);
  app.useLogger(new NestJSLoggingAdapter(logger));

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
