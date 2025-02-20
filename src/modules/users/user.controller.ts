import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards,Request,Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ApiOkResponse, ApiOperation, ApiTags,ApiBearerAuth,ApiQuery } from '@nestjs/swagger';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
import { CreateUserResponse, GetAllUsersResponse, GetUserInfoResponse, UpdateUserResponse } from './response/user.response';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/guard/jwtStrategy';
import { JwtAuthGuard } from 'src/auth/guard/Jwt-Auth.guard';

@ApiTags('User')


// @ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('allUsers')
  @ApiOperation({ summary: 'Get all users with optional filters' })
  @ApiOkResponse({ type: GetAllUsersResponse })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by user name' })
  @ApiQuery({ name: 'email', required: false, description: 'Filter by user email' })
  findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    return this.userService.findAll({ name, email });
  }
  
  @Get('info')
  @ApiOperation({ summary: 'Get user info by filters' })
  @ApiOkResponse({ type: GetUserInfoResponse })
  @ApiQuery({ name: 'name', required: false, description: 'Find by user name' })
  @ApiQuery({ name: 'email', required: false, description: 'Find by user email' })
  async getUserInfo(@Query() query: { name?: string; email?: string }) {
    const { name, email } = query;
    const response = await this.userService.findOne({ name, email });
    return response;
  }
  
  

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ type: CreateUserResponse })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UpdateUserResponse })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ type: DefaultResponse })
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }

}
