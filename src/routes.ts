import { Router } from 'express';

import IndexController from './controllers/IndexController';
import UsersController from './controllers/UsersController';

const routes = Router();

routes.use('/', IndexController);
routes.use('/users', UsersController);

export default routes;
