import {Entity,PrimaryGeneratedColumn,Column,ManyToOne, JoinTable, ManyToMany} from 'typeorm';
import { Spectacle } from './spectacle.entyty';
import {User} from './user.entyty'
  
  @Entity()
  export class Event {
    
    
    @PrimaryGeneratedColumn()
    id!: number;
  
   
    @Column({ type: 'timestamp'})
    startAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    endAt!: Date;
  
    @Column({ nullable: true })
    description!: string;
  

    @ManyToOne(
        type => Spectacle,
        spectacle => spectacle.events)
    spectacle!: Spectacle;

    @ManyToMany(type => User)
    @JoinTable()
    users!: User[];
    
    
  
    
}