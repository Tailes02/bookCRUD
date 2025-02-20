import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './docs/swagger';
import { swaggerOptions } from './docs/swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  SwaggerModule.setup(
    `${process.env.API_ENDPOINT_PREFIX || 'api'}/docs`,
    app,
    createDocument(app),
    swaggerOptions,
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
