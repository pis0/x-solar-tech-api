import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import Routes from './routes';
import 'reflect-metadata';

import './remote';
import ApiError from './errors/api.error';

const app = express();

app.use(Routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({
      type: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    type: 'error',
    message: 'Server error',
  });
});

app.listen(3333, () => {
  console.log('server up!');
});
