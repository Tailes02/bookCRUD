import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { Book } from './entities/books.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('allBooks')
  findAll() {
    return this.bookService.findAll();
  }

  @Get('find/:id')
  get(@Param("id") id: string) {
    return this.bookService.findOne(+id);
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }
  @Delete('delete/:id')
  deleteBook(@Param() params) {
    return this.bookService.remove(params.id);
  }
}
