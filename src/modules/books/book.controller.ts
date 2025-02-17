import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Book } from './entities/books.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('getall')
  async findAll(): Promise<Book[]> {
    try {
      return await this.bookService.findAll();
    } catch (err) {
      throw new HttpException(
        'Error fetching books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    };
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string): Promise<Book> {
    try {
      const book = await this.bookService.findOne(+id);
      if (!book) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return book;
    } catch (err) {
      throw new HttpException(
        err.message || 'Error fetching book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create')
  async create(@Body() createBookDto: BookDto): Promise<Book> {
    try {
      return await this.bookService.create(createBookDto);
    } catch (err) {
      throw new HttpException(
        'Error creating book',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: BookDto): Promise<Book> {
    try {
      const updatedBook = await this.bookService.update(+id, updateBookDto);
      if (!updatedBook) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      };
      return updatedBook;
    } catch (err) {
      throw new HttpException(
        err.message || 'Error updating book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const result = await this.bookService.remove(+id);
      if (!result) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Book deleted successfully' };
    } catch (err) {
      throw new HttpException(
        err.message || 'Error deleting book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
