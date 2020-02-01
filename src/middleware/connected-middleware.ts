import jwt = require('express-jwt');
import { environnment } from '../environnements/environment';

export const connected = () => {
	const secret = process.env.SECRET;
	if (!secret) {
		throw new Error('Pas de secret setup');
	}
	// Accroche du middleware avec secret
	return jwt({ secret });
};
