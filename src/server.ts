import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import "express-async-errors";
import routes from './routes';
import "reflect-metadata";
import './database'

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log('Server started on port 3333!');
});
