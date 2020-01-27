import { User } from '../models/user.entyty';
import { createConnection, Connection } from 'typeorm';

export default async () => {
	const connection: Connection = await createConnection({
		type: 'mysql',
		host: '172.17.0.2', // Ip container phpmyadmin 172.17.0.2 "/Checkpoint_4"/ adminer: 172.17.0.
		username: 'root',
		password: '123',
		database: 'test',
		entities: [ User ],
		synchronize: true
	});

	return connection;
};
