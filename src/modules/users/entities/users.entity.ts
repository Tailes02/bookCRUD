import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/books.entity';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'ID của user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'john_doe', description: 'Tên người dùng' })
  @Column()
  name: string;

  @ApiProperty({ example: 'quangdn@gmail.com', description: 'Email' })
  @Column()
  email: string;

  @ApiProperty({ example: '123456', description: 'Mật khẩu người dùng' })
  @Column()
  password: string;

  @ApiProperty({ type: () => [Book], description: 'Danh sách của người dùng' })
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @ApiProperty({example: '../shared/photos', description: 'ảnh đại diện'})
  @Column()
  avatar: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
