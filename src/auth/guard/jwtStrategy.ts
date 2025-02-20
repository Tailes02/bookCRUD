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
    console.log('Looking up user with ID:', payload.sub);

    if (!user || user.code !== 200) {
      throw new UnauthorizedException('Invalid token or user not found');
    }

    return user.data; 
  }
  
}
