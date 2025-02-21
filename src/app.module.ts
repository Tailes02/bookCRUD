import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { BookModule } from './modules/books/book.module';
import { typeOrmConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    TypeOrmModule.forRoot(typeOrmConfig), 
    UserModule,
    BookModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    })
    ],
})
export class AppModule {}
