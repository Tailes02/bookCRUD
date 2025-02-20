import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({ example: 1, description: 'id user'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Wutherings Height', description: 'tên sách'})
  @Column()
  title: string;

  @ApiProperty({ example: 'Emily Bronte', description: 'tên tác giả'})
  @Column()
  author: string;

  @ApiProperty({ example: '20-06-2004', description: 'ngày phát hành'})
  @Column()
  publicationDate: string;

  @ApiProperty({ type: () => User, description: 'Người dùng sở hữu sách' })
  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'userId', foreignKeyConstraintName: 'fk_book_user' })
  user: User;
}
