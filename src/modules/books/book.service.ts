import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  create(createBookDto: BookDto) {
    return this.bookRepo.save(createBookDto);
  }

  findAll() {
    return this.bookRepo.find({ relations: ['books'] });
  }

  findOne(id: number) {
    try {
      
    } catch (error) {
      
    }
    return this.bookRepo.findOne({ where: { id }, relations: ['books'] });
  }

  update(id: number, updateBookDto: BookDto) {
    this.bookRepo.update(id, updateBookDto);
    const updatedBook = this.bookRepo.findOne({ where: { id } });
    return updatedBook || null;
  }

  remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
