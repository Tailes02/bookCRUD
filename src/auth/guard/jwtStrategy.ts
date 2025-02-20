import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_key', 
    });
  }

  async validate(payload: any) {
    console.log('vao day!!!!!!!!')
    const user = await this.userService.findOne(payload.sub);
    console.log('User fetched from DB:', user);
  
    if (!user || user.code !== 200) {
      console.error('Unauthorized: Invalid token or user not found');
      throw new UnauthorizedException('Invalid token or user not found');
    }
  
    console.log('User authenticated successfully:', user.data);
    return user.data;
  }
  
  
  
}
