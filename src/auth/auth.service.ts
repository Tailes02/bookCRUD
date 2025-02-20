import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    
    if (!user) {
      console.log('User not found');
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(pass, user.password);
  
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null;
    }
  
    console.log('User authenticated:', user);
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    console.log('User :', user); 

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
