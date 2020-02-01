import { Application, Router, Request, Response } from 'express';
import { userService } from './../services/user.service';

export const UserController = (app: Application) => {
	const UserService = new userService();

	const userRouter = Router();

	userRouter.get('/', async (req: Request, res: Response) => {
		res.send(await UserService.get());
	});

	userRouter.get('/:id', async (req: Request, res: Response) => {
		res.send(await UserService.getById(Number(req.params.id)));
	});

	userRouter.post('/', async (req: Request, res: Response) => {
		res.send(await UserService.post(req.body));
	});

	userRouter.put('/:id', async (req: Request, res: Response) => {
		const obj = await UserService.update(parseInt(req.params.id, 10), req.body);
		res.send(obj);
	});

	userRouter.delete('/:id', async (req: Request, res: Response) => {
		res.send(await UserService.deleteById(parseInt(req.params.id, 10)));
	});

	// Sur l'URL "me" dans "users", on récupère l'utilisateur associé à l'ID qu'il y a dans le Token
	userRouter.get('/me', async (req: Request, res: Response) => {
		let user;
		console.log((req as any).user);

		try {
			user = await UserService.getById((req as any).user.id);
		} catch (error) {
			console.log(error);
		}

		if (!user) {
			res.status(404).send('Aucun utilisateur trouvé pour ce token');
		}
		res.send(user);
	});

	app.use('/user', userRouter);
};
