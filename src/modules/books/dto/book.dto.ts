import { IsOptional, IsString, IsNotEmpty, IsDate } from "class-validator";
export class BookDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  author?: string;

  @IsOptional()
  publicationDate?: string;
}



