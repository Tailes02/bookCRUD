import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CreateUserResponse, GetAllUsersResponse, GetUserInfoResponse, UpdateUserResponse } from './response/user.response';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}


  
  async create(payload: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const userExists = await this.userRepo.findOne({
        where: { email: payload.email },
      });
      if (userExists) throw new BadRequestException('User already exists');
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(payload.password, saltRounds);
  
      const userToSave = {
        ...payload,
        password: hashedPassword,
      };
  
      const user = await this.userRepo.save(userToSave);
  
      return { code: 200, status: 'success', data: user };
    } catch (error) {
      console.error('Error creating the user:', error.message);
      return { code: 400, status: 'error', data: null };
    }
  }
  

  async findAll(filters?: { name?: string; email?: string },page: number = 1, limit: number = 3): Promise<GetAllUsersResponse> {
    try {
      const query = this.userRepo.createQueryBuilder('user')
        .leftJoinAndSelect('user.books', 'books');
  
      if (filters?.name) {
        query.andWhere('user.name LIKE :name', { name: `%${filters.name}%` });
      }

      if (filters?.email) {
        query.andWhere('user.email LIKE :email', { email: `%${filters.email}%` });
      }
      const [users, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      code: 200,
      status: 'success',
      data: users,
      meta: {
        pagination: {
          count: users.length,
          current_page: page,
          per_page: limit,
          total: total,
          total_pages: totalPages,
        },
      },
    };

    } catch (error) {
      console.error('Error retrieving the users:', error.message);
    return {
      code: 400,
      status: 'error',
      data: [],
      meta: {
        pagination: {
          count: 0,
          current_page: page,
          per_page: limit,
          total: 0,
          total_pages: 0,
        }
      },
    };

   }
  }
  

  async findOne(filters: { name?: string; email?: string }): Promise<GetUserInfoResponse> {
    const query = this.userRepo.createQueryBuilder('user')
      .leftJoin('user.books', 'books')
      .addSelect(['books.id', 'books.title', 'books.author']);
  
      if (filters?.name) query.andWhere('user.name = :name', { name: filters.name });
      if (filters?.email) query.andWhere('user.email = :email', { email: filters.email });
  
    const user = await query.getOne();
    if (!user) return { code: 404, status: 'not_found', data: null };
  
    return { code: 200, status: 'success', data: user };
  }

  async update(id: number, payload: UpdateUserDto): Promise<UpdateUserResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);
      const updatedUser = this.userRepo.merge(user, payload);
      const savedUser = await this.userRepo.save(updatedUser);
      return {
        code: 200,
        status: 'success',
        data: savedUser,
      };
    } catch (error) {
      console.error('Error updating the user:', error.message);
      return { code: 400, status: 'error', data: null };
    }
  }

  async remove(id: number): Promise<DefaultResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.userRepo.remove(user);
      return { code: 200, status: 'success' };
    } catch (error) {
      console.error('Error deleting the user:', error.message);
      return { code: 400, status: 'error' };
    }
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }
  
}
