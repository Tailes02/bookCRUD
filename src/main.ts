import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder,SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); 

  const config = new DocumentBuilder()
   .setTitle("Bookstore API")
   .setDescription("BookCRUD")
   .build();

   const document = SwaggerModule.createDocument(app, config);
   
   SwaggerModule.setup("api", app, document);  // setup swagger


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
