import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn() id!: number;

	@Column({ type: 'varchar', length : 50}) name!: string;

	@Column() age!: number;

	@Column({ type: 'boolean', default: false}) activated!: boolean; 
}
