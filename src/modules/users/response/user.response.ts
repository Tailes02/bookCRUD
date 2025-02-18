import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from "class-transformer";
import { User } from '../entities/users.entity';

export class UserResponse extends User{
  @Expose()
  @ApiProperty({ example: '1', description: 'Book ID' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Tailes', description: 'User name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'taihuule02@gmail.com', description: 'email' })
  email: string;

  @Exclude()
  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;
}



