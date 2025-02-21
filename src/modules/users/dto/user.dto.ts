import { IsString, IsEmail, IsNotEmpty,  Matches} from "class-validator";
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

  @IsNotEmpty()
  // @Matches(/^(\/|\.\/|\.\.\/)?([\w.-]+(\/)?)+$/)  
  @ApiProperty({ example: '.../shared/upload/162070226578815499', description: 'avatar url' })
  avatar: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}



