import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/users.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('allUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Get("find\:id")
  get(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Post('create')
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }
  @Put('update\:id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Delete('delete\:id')
  deleteUser(@Param() params) {
    return this.userService.remove(params.id);
  }
}
