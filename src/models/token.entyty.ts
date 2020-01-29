import { User } from './user.entyty';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Token {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  value!: string;

  @CreateDateColumn()
  expiration!: Date;

  @OneToOne(type => User)
  @JoinColumn()
  user!: User;

}
