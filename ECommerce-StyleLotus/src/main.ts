import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './Middlewares/logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
