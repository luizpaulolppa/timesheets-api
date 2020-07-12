import { Router, Request, Response } from "express";


const indexRouter = Router();

indexRouter.get('/', async (request: Request, response: Response) => {
  return response.json({ ok: true });
});

export default indexRouter;
