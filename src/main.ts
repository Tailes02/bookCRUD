import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './docs/swagger';
import { swaggerOptions } from './docs/swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
<<<<<<< HEAD
  app.enableCors(); 

  const config = new DocumentBuilder()
   .setTitle("Bookstore API")
   .setDescription("BookCRUD")
   .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    
  }, 'jwt',
)
  .build();
  
   const document = SwaggerModule.createDocument(app, config);
   
   SwaggerModule.setup("api", app, document);  
=======
  app.enableCors();
>>>>>>> 42bea640926f0b4c56602aaa74f753a9d95f3925

  SwaggerModule.setup(
    `${process.env.API_ENDPOINT_PREFIX || 'api'}/docs`,
    app,
    createDocument(app),
    swaggerOptions,
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
