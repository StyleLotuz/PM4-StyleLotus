import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './Middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(logger);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce StyleLotus API')
    .setDescription(
      'This is an Api where you can user differents endpoint that you can use in an ecommerce',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
