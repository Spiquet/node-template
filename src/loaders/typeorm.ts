import { User } from '../models/user.entyty';
import { createConnection, Connection } from 'typeorm';

export default async () => {
	const connection: Connection = await createConnection({
		type: 'mysql',
		host: 'localhost', // Ip container mySQL
		//port: 3306, // pas besoin car 3306 == port mysql par défault
		username: 'root',
		password: process.env.SQL_Password,
		database: 'movies',
		entities: [ User ],
		synchronize: true,
		logging: false
	});

	return connection;
};
