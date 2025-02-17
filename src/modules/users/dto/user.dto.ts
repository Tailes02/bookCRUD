import { IsString, IsEmail, IsNotEmpty} from "class-validator";
export class UserDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;
}



