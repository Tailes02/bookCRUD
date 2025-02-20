import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsNumber } from "class-validator";
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Wuthering Heights', description: 'book name' })
  
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Emily Brontes', description: 'author name' })

  author: string;

  @IsDate()
  @ApiProperty({ example: '20-06-2022', description: 'publish date' })
  publicationDate: string;

  @IsNumber()
  @ApiProperty({ example: '2', description: 'foreign key' })
  userId:number;
}


export class UpdateBookDto extends PartialType(CreateBookDto) {}


