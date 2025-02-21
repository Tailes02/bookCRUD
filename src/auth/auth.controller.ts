import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiOperation,ApiOkResponse,ApiTags } from '@nestjs/swagger';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ type: DefaultResponse, description: 'User login successful' })
  async login(@Request() req) {
    console.log('Login request user:', req.user); 
    if (!req.user) {
      throw new Error('User not found in request');
    }
    return this.authService.login(req.user);
  }
}
