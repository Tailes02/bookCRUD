import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { UserDto } from './dto/user.dto';
import { UserResponse } from './response/user.response';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: UserDto): Promise<UserResponse> {
    try {
      const user = this.userRepo.create(createUserDto);
      const savedUser = await this.userRepo.save(user);
      return savedUser
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating the user');
    }
  }
  
   async findAll(): Promise<UserResponse[]> {
     try {
       const users = await this.userRepo.find({ relations: ['books'] });
   
       return users
     } catch (error) {
       console.error('Error retrieving users:', error.message);
       throw new InternalServerErrorException('Error retrieving users');
     }
   }
  
  async findOne(id: number): Promise<UserResponse> {
    try {
      const user = await this.userRepo.findOne({where: { id },relations: ['books']});
  
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
  
      return user
    } catch (error) {
      console.error('Error retrieving the user:', error.message);
      throw new InternalServerErrorException('Error retrieving the user');
    }
  }
  
  async update(id: number, updateUserDto: UserDto): Promise<UserResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
  
      const updatedUser = this.userRepo.merge(user, updateUserDto);
      const savedUser = await this.userRepo.save(updatedUser);
  
      return savedUser;
    } catch (error) {
      console.error('Error updating the user:', error.message);
      throw new InternalServerErrorException('Error updating the user');
    }
  }
  
  async remove(id: number): Promise<{ message: string }> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
        await this.userRepo.remove(user);  
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting the user:', error.message);
      throw new InternalServerErrorException('Error deleting the user');
    }
  }
  async createUser(email: string, password: string): Promise<User> {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
}
}
