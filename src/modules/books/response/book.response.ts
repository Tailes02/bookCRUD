import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Book } from '../entities/books.entity';

export class BookResponse extends Book{
  @Expose()
  @ApiProperty({ example: 1, description: 'Book ID' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Tales', description: 'Book title' })
  title: string;

  @Expose()
  @ApiProperty({ example: 'Whiteforest', description: 'Book author' })
  author: string;

  @Expose()
  @ApiProperty({ example: '2024-02-17', description: 'Publication Date' })
  publicationDate: string;
}

  
