import {Entity,PrimaryGeneratedColumn,Column,ManyToOne, JoinTable, ManyToMany} from 'typeorm';
import { Spectacle } from './spectacle.entyty';
import {User} from './user.entyty'


export enum EventRole {
  SPECTACLE = 'Spectacle',
  // COURS = 'Cours'
}

  
  @Entity()
  export class Event {
    
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
      type: 'enum',
      enum: EventRole,
      default: EventRole.SPECTACLE,
    })
    eventType!: EventRole;
  
   
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