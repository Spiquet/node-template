import { Application, Router, Request, Response } from 'express';
import { userService } from '.././services/user.service';

export const UserController = (app: Application) => {
	const UserService = new userService();

	const userRouter = Router();

	userRouter.get('/', async (req: Request, res: Response) => {
		res.send(await UserService.get());
	});

	userRouter.post('/', async (req: Request, res: Response) => {
		res.send(await UserService.post(req.body));
	});

	app.use('/user', userRouter);
};
