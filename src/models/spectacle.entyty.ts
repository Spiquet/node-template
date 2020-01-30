import {Entity,PrimaryGeneratedColumn,Column,OneToMany, Timestamp, JoinTable, ManyToMany,} from 'typeorm';
import { Event } from './event.entyty';

  
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

    @Column({nullable: true})
    link1!: string;
  
    @Column({nullable: true})
    link2!: string;

    @OneToMany(
        type => Event,
        event => event.spectacle)
      events!: Event[];

            
    
  
    
}