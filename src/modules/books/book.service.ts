import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { CreateBookResponse, GetAllBooksResponse, GetBookInfoResponse, UpdateBookResponse } from './response/book.response';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async create(payload: CreateBookDto): Promise<CreateBookResponse> {
    try {
      const bookExists = await this.bookRepo.findOne({
        where: { title: payload.title },
      });
      if (bookExists) throw new BadRequestException('Book already exists');
      const book = await this.bookRepo.save(payload);
      return { code: 200, status: 'success', data: book };
    } catch (error) {
      console.error('Error creating the book:', error.message);
      return { code: 400, status: 'error', data: null };
    }
  }

  async findAll(): Promise<GetAllBooksResponse> {
    try {
      const books = await this.bookRepo.find({ relations: ['books'] });
      return {
        code: 200,
        status: 'success',
        data: books,
      };
    } catch (error) {
      console.error('Error retrieving the books:', error.message);
      return { code: 400, status: 'error', data: [] };
    }
  }

  async findOne(id: number): Promise<GetBookInfoResponse> {
    try {
      const book = await this.bookRepo.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
      return {
        code: 200,
        status: 'success',
        data: book,
      };
    } catch (error) {
      console.error('Error retrieving the book:', error.message);
      return { code: 400, status: 'error', data: null };
    }
  }

  async update(id: number, payload: UpdateBookDto): Promise<UpdateBookResponse> {
    try {
      const book = await this.bookRepo.findOne({ where: { id } });
      if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
      const updatedBook = this.bookRepo.merge(book, payload);
      const savedBook = await this.bookRepo.save(updatedBook);
      return {
        code: 200,
        status: 'success',
        data: savedBook,
      };
    } catch (error) {
      console.error('Error updating the book:', error.message);
      return { code: 400, status: 'error', data: null };
    }
  }

  async remove(id: number): Promise<DefaultResponse> {
    try {
      const book = await this.bookRepo.findOne({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      await this.bookRepo.remove(book);
      return { code: 200, status: 'success' };
    } catch (error) {
      console.error('Error deleting the book:', error.message);
      return { code: 400, status: 'error' };
    }
  }
}
