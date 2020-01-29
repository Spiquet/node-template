import {Entity,PrimaryGeneratedColumn,Column,OneToMany, Timestamp, JoinTable, ManyToMany,} from 'typeorm';
import { Event } from './event.entyty';
import { type } from 'os';
import { User } from './user.entyty';
  
  @Entity()
  export class Spectacle {
    
    
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    title!: string;
  
    @Column()
    description!: string;
  
    @Column()
    date!: Date;

    @Column()
    link1!: string;
  
    @Column()
    link2!: string;

    @OneToMany(
        type => Event,
        event => event.spectacle)
      events!: Event[];

            
    
  
    
}