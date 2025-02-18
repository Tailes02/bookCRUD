import { IsString, IsEmail, IsNotEmpty, IsOptional} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Tailes', description: 'User name' })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'taihuule02@gmail.com', description: 'email' })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345678', description: 'password' })
  password?: string;
}



