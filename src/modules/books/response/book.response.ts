import { DefaultResponse } from 'src/docs/default/default-response.swagger';
import { Book } from '../entities/books.entity';
import { ApiProperty } from '@nestjs/swagger';
export class BookData extends Book {}

export class GetAllBooksResponse extends DefaultResponse {
  @ApiProperty({ type: [Book] })
  data: Book[]
}

export class GetBookInfoResponse extends DefaultResponse {
  @ApiProperty({ type: Book })
  data: Book | null;
}

export class CreateBookResponse extends GetBookInfoResponse {}
export class UpdateBookResponse extends GetBookInfoResponse {}
