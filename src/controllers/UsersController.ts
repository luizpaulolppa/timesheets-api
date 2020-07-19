import { Router, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import UserService from '../services/UserService';

const usersRouter = Router();

const userService = new UserService();

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  const user = await userService.createNewUser({ name, email, password });
  return response.status(HttpStatus.CREATED).json(user);
});

export default usersRouter;
