import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { UserModule } from './modules/users/user.module';
import { BookModule } from './modules/books/book.module';
import { ProtectedModule } from './modules/auth/protected/protected.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    UserModule,
    BookModule, 
    ProtectedModule
    ],
})
export class AppModule {}
