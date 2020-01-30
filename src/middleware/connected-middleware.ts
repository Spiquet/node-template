import jwt = require('express-jwt');
import { environnment } from '../environnements/environment';

export const connected = () => {
	const secret = environnment.JWT_SECRET;
	if (!secret) {
		throw new Error('Pas de secret setup');
	}
	// Accroche du middleware avec secret
	return jwt({ secret });
};
