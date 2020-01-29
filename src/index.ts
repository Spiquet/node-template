import express from 'express';
import 'reflect-metadata';
import loaders from './loaders';
import { UserController } from './controller/user.controller';
import { SpectacleController } from './controller/spectacle.controller';

async function startServer() {
	// Récupération de l'application initiale
	const app = express();

	// Chargement des différent loader
	await loaders(app);

	// Ajout des différentes route de votre application
	SpectacleController(app);
	UserController(app);

	// Démarrage du serveur une fois que tout est correctement init
	app.listen(3000, () => console.log('Express server  is running'));
}

startServer();
