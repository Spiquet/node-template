import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';

export enum UserRole {
	GHOST = 'ghost',
	USER = 'user',
	ADMIN = 'admin',
  }
  @Entity()
  export class User {
  
	@PrimaryGeneratedColumn()
	id!: number;
  
	@Column()
	firstName!: string;
  
	@Column()
	lastName!: string;
  
	@Column()
	password!: string;

  
	@Index({ unique: true })
	@Column()
	email!: string;
  
	@Column({
	  type: 'enum',
	  enum: UserRole,
	  default: UserRole.GHOST,
	})
	role?: UserRole;
  
	@CreateDateColumn()
	createdAt!: Date;
  
	@CreateDateColumn()
	updateAt!: Date;
  
	@Column({ default: false })
	isActive!: boolean;

	

	

}