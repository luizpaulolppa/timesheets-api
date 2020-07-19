import { Router } from 'express';

import IndexController from './controllers/IndexController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

const routes = Router();

routes.use('/', IndexController);
routes.use('/users', UsersController);
routes.use("/sessions", SessionsController);

export default routes;
