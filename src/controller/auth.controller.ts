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
	}),
		authRouter.get('/confirmation/:token', async (req: Request, res: Response) => {
			const tokenStr = req.params.token;
			try {
				await authService.confirmation(tokenStr);
			} catch (error) {
				res.status(400).send('Lien invalide');
			}
		}),
		authRouter.post('/signin', async (req: Request, res: Response) => {
			const userB = req.body;
			try {
				const { token, user } = await authService.signin(userB.email, userB.password);
				res.set('access-control-expose-headers', 'JWT-TOKEN');
				res.set('JWT-TOKEN', token); // Set du header
				res.send(user);
			} catch (error) {
				console.log(error);
				if (error.message === 'NOT_ACTIVE') {
					res.status(409).send("Le compte n'est pas activé, vérifiez vos spams ");
				}
				res.status(409).send('Informations érronnées');
				console.log(error);
			}
		}),
		app.use('/auth', authRouter);
};
