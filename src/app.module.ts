import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { BookModule } from './modules/books/book.module';
import { typeOrmConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './shared/common/middlewares/logging.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join }  from 'path';
;{ }
@Module({
  imports: [

    TypeOrmModule.forRoot(typeOrmConfig), 
    UserModule,
    BookModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './shared/photos'), 
      serveRoot: '/images', 
    }),
    ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); 
  }
}