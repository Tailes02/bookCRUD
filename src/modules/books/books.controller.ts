import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param
} from "@nestjs/common";
import { BookService } from "./books.service";
import { CreateBookDto } from "./dtos/create-book.dto";
import { UpdateBookDto } from "./dtos/update-book.dto";
import { Book } from "./entities/books.entity";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.bookService.findOne(+id); // Convert string to number
  }

  @Post('/create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Put(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }
  @Delete(":id")
  deleteBook(@Param("id") id: string) {
    return this.bookService.remove(+id); // Convert string to number
  }
}
