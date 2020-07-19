import { Router, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  return response.status(HttpStatus.CREATED).json({ user: {} });
});

export default usersRouter;
