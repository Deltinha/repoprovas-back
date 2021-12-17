import './setup';

import express from 'express';
import cors from 'cors';
import 'reflect-metadata';

import connectDatabase from './database';
import examRouter from './routers/examRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/exams', examRouter);

app.use(errorHandler);

export async function init() {
  await connectDatabase();
}

export default app;
