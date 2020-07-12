import { Router } from 'express';

import IndexController from './controllers/IndexController';

const routes = Router();

routes.use('/', IndexController);

export default routes;