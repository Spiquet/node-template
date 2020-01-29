import { User } from '../models/user.entyty';
import { createConnection, Connection } from 'typeorm';
import { Spectacle } from '../models/spectacle.entyty';
import { Event } from '../models/event.entyty';
import { Token } from '../models/token.entyty';

export default async () => {
	const connection: Connection = await createConnection({
		type: 'mysql',
		host: 'localhost', // Ip container mySQL
		port: 1234, // pas besoin car 3306 == port mysql par défault
		username: 'root',
		password: 'free',
		database: 'wild_circus',
		entities: [ User, Spectacle, Event, Token ],
		synchronize: true
	});

	return connection;
};
