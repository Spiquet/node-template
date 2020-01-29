import {Entity,PrimaryGeneratedColumn,Column,OneToMany, Timestamp,} from 'typeorm';
  //import { Event } from './event.entity';
  
  @Entity()
  export class Event {
    
    
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    date!: number;
  
    @Column()
    time!: number;
  
    
    
  
    
}