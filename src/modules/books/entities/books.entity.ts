import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationDate: string;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'id', foreignKeyConstraintName: 'fk_book_user' }) 
  user: User;
}
