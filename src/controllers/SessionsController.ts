import { Router, Request, Response } from "express";
import HttpStatus from 'http-status-codes';
import SessionsService from '../services/SessionsService';

const sessionsRoute = Router();

const sessionsService = new SessionsService();

sessionsRoute.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const { user, token } = await sessionsService.authenticateUser(email, password);
  return response.status(HttpStatus.CREATED).json({ user, token });
});

export default sessionsRoute;
