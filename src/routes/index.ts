import {
  Router, Request, Response, NextFunction,
} from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth.config';

import CustomerRoute from './customer.route';
import AddresseRoute from './address.route';
import UserRoute from './user.route';
import AuthRoute from './auth.route';

import ApiError from '../errors/api.error';

const Routes = Router();

function logReq(req: Request, res: Response, next: NextFunction): void {
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

interface TokenDto {
  iat: number;
  exp: number;
  sub: string;
}

function validateToken(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new ApiError('invalid/missing token.');
  }
  const [, token] = auth.split(' ');

  const payload = verify(token, AuthConfig.jwt.secret);
  const { sub } = payload as TokenDto;
  req.user = {
    id: sub,
  };

  next();
}


Routes.use(logReq);
Routes.use('/auth', AuthRoute);
Routes.use('/user', UserRoute);
Routes.use('/customer', validateToken, CustomerRoute);
Routes.use('/address', validateToken, AddresseRoute);

export default Routes;
