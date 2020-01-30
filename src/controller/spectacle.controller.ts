import { Application, Router, Request, Response } from 'express';
import { spectacleService } from '.././services/spectacle.service';

export const SpectacleController = (app: Application) => {
	const SpectacleService = new spectacleService();

	const spectacleRouter = Router();

	spectacleRouter.get('/', async (req: Request, res: Response) => {
		res.send(await SpectacleService.get());
	});

	spectacleRouter.post('/', async (req: Request, res: Response) => {
		res.send(await SpectacleService.post(req.body));
	});

	spectacleRouter.put('/:id', async (req: Request, res: Response) => {
		const obj = await SpectacleService.update(parseInt(req.params.id, 10), req.body);
		res.send(obj);
	});

	spectacleRouter.delete('/:id', async (req: Request, res: Response) => {
		res.send(await SpectacleService.deleteById(parseInt(req.params.id, 10)));
	});

	app.use('/spectacle', spectacleRouter);
};
