import {Entity,PrimaryGeneratedColumn,Column,OneToMany, Timestamp,} from 'typeorm';
  //import { Event } from './event.entity';
  
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
  
    
}