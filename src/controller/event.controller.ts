import { Application, Router, Request, Response } from 'express';
import { eventService } from '.././services/event.service';

export const EventController = (app: Application) => {
	const EventService = new eventService();

	const eventRouter = Router();

	eventRouter.get('/spectacle', async (req: Request, res: Response) => {
		res.send(await EventService.get());
	});

	eventRouter.post('/spectacle', async (req: Request, res: Response) => {
		res.send(await EventService.post(req.body));
	});

	app.use('/event', eventRouter);
};
