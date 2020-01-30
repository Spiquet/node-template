import { TokenService } from './../services/token.service';
import { Application, Router } from 'express';

export const SiteController = (app: Application) => {
	const siteService = new TokenService();
	const tokenRouter = Router();

	app.use('/token', tokenRouter);
};
