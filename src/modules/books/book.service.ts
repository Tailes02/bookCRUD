import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { BookDto } from './dto/book.dto';
import { BookResponse } from './response/book.response';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async create(createBookDto: BookDto): Promise<BookResponse> {
    try {
      const book = this.bookRepo.create(createBookDto);
      const savedBook = await this.bookRepo.save(book);
      return savedBook
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating the book');
    }
  }
  
  async findAll(): Promise<BookResponse[]> {
    try {
      const books = await this.bookRepo.find({ relations: ['user'] });
  
      return books
    } catch (error) {
      console.error('Error retrieving books:', error.message);
      throw new InternalServerErrorException('Error retrieving books');
    }
  }
  
  async findOne(id: number): Promise<BookResponse> {
    try {
      const book = await this.bookRepo.findOne({where: { id },relations: ['user']});
  
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
  
      return book
    } catch (error) {
      console.error('Error retrieving the book:', error.message);
      throw new InternalServerErrorException('Error retrieving the book');
    }
  }
  
  async update(id: number, updateBookDto: BookDto): Promise<BookResponse> {
    try {
      const book = await this.bookRepo.findOne({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
  
      const updatedBook = this.bookRepo.merge(book, updateBookDto);
      const savedBook = await this.bookRepo.save(updatedBook);
  
      return savedBook;
    } catch (error) {
      console.error('Error updating the book:', error.message);
      throw new InternalServerErrorException('Error updating the book');
    }
  }
  
  async remove(id: number): Promise<{ message: string }> {
    try {
      const book = await this.bookRepo.findOne({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
        await this.bookRepo.remove(book);  
      return { message: 'Book deleted successfully' };
    } catch (error) {
      console.error('Error deleting the book:', error.message);
      throw new InternalServerErrorException('Error deleting the book');
    }
  }
  
}
