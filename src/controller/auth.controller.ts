import express, { Application, Request, Response, Router } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = (app: Application) => {
	const authRouter: Router = express.Router();
	const authService = new AuthService();

	authRouter.get('/', (req: Request, res: Response) => {
		res.send('Protected Routes');
	});

	authRouter.post('/signup', async (req: Request, res: Response) => {
		let user = req.body;
		try {
			user = await authService.signup(user);
			res.send(user);
		} catch (error) {
			console.error(error);

			res.status(409).send("L'utilisateur existe déjà");
		}
	});

	app.use('/auth', authRouter);
};
