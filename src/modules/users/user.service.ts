/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: UserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find({ relations: ['books'] });
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id }, relations: ['books'] });
  }
  

  update(id: number, updateUserDto: UserDto) {
    this.userRepo.update(id, updateUserDto);
    const updatedUser = this.userRepo.findOne({ where: { id } });
    return updatedUser || null;
  }
  
  

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
