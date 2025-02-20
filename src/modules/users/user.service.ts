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
  

  async findAll(): Promise<GetAllUsersResponse> {
    try {
      const users = await this.userRepo.find({ relations: ['books'] });
      return {
        code: 200,
        status: 'success',
        data: users,
      };
    } catch (error) {
      console.error('Error retrieving the users:', error.message);
      return { code: 400, status: 'error', data: [] };
    }
  }

  async findOne(id: number): Promise<GetUserInfoResponse> {
    try {
      
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ['books'],
      });
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);
      return {
        code: 200,
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error retrieving the user:', error.message);
      return { code: 400, status: 'error', data: null };
    }
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
