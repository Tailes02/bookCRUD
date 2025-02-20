import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export const createDocument = (app) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // Tên định nghĩa cho Auth
    );

  if (SWAGGER_CONFIG.apiKey)
    swaggerConfig.addApiKey(SWAGGER_CONFIG.apiKey, SWAGGER_CONFIG.apiKeyName);
  const config = swaggerConfig.build();

  return SwaggerModule.createDocument(app, config);
};
