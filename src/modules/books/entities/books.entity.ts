import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  publicationDate: string;

  @ApiProperty({ type: () => User, description: 'Người dùng sở hữu sách' })
  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'userId', foreignKeyConstraintName: 'fk_book_user' })
  user: User;
}
