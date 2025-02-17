import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/users.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getall')
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    };
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findOne(+id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (err) {
      throw new HttpException(
        err.message || 'Error fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create')
  async create(@Body() createUserDto: UserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (err) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UserDto): Promise<User> {
    try {
      const updatedUser = await this.userService.update(+id, updateUserDto);
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      };
      return updatedUser;
    } catch (err) {
      throw new HttpException(
        err.message || 'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const result = await this.userService.remove(+id);
      if (!result) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'User deleted successfully' };
    } catch (err) {
      throw new HttpException(
        err.message || 'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
