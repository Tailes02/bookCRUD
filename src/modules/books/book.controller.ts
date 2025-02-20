import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards,Request,Query} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { ApiOkResponse, ApiOperation, ApiTags,ApiBearerAuth,ApiQuery } from '@nestjs/swagger';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
import { CreateBookResponse, GetAllBooksResponse, GetBookInfoResponse, UpdateBookResponse } from './response/book.response';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/guard/jwtStrategy';
import { JwtAuthGuard } from 'src/auth/guard/Jwt-Auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

   @Get('allBooks')
   @ApiOperation({ summary: 'Get all books with optional filters' })
   @ApiOkResponse({ type: GetAllBooksResponse })
   @ApiQuery({ name: 'title', required: false, description: 'Filter by title' })
   @ApiQuery({ name: 'author', required: false, description: 'Filter by author' })
   findAll(
     @Query('title') title?: string,
     @Query('author') author?: string,
   ) {
     return this.bookService.findAll({ title, author });
   }
   
   @Get('find')
   @ApiOperation({ summary: 'Get book info by filters' })
   @ApiOkResponse({ type: GetBookInfoResponse })
   @ApiQuery({ name: 'bookTitle', required: false, description: 'Find by book title' })
   @ApiQuery({ name: 'bookAuthor', required: false, description: 'Find by book author' })
   @ApiQuery({ name: 'publicationDate', required: false, description: 'Find by publication date' })
   async getBookInfo(@Query() query: { bookTitle?: string; bookAuthor?: string; publicationDate?: string }) {
     const { bookTitle, bookAuthor, publicationDate } = query;
     const response = await this.bookService.findOne({ bookTitle, bookAuthor, publicationDate });
     return response;
    }

  @Post('create')
  @ApiOperation({ summary: 'Create book' })
  @ApiOkResponse({ type: DefaultResponse })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Put('update/:id')
  @ApiOperation({ summary: 'Update book' })
  @ApiOkResponse({ type: DefaultResponse })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete book' })
  @ApiOkResponse({ type: DefaultResponse })
  deleteUser(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
