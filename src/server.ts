if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import "express-async-errors";
import routes from './routes';
import "reflect-metadata";
import './database'
import AppError from './errors/AppError';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  return response.status(500).json({
    status: 500,
    message: "Internal server error"
  })
});

app.listen(PORT, () => {
  console.log('Server started on port 3333!');
});
