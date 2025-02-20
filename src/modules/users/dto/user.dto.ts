import { IsString, IsEmail, IsNotEmpty, IsOptional} from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Tailes', description: 'User name' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'taihuule02@gmail.com', description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}



