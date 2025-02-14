import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepo.save(createBookDto);
  }

  findAll() {
    return this.bookRepo.find({ relations: ['books'] });
  }

  findOne(id: number) {
    return this.bookRepo.findOne({ where: { id }, relations: ['books'] });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepo.update(id, updateBookDto);
  }

  remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
