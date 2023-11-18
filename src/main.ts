import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { loggerFn } from './middlewares/loggerFn.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  /**
   * class-transformer 가 적용되게 하려면 transform: true 속성 필요
   */
  app.use(loggerFn);
  await app.listen(8000);
}
bootstrap();
