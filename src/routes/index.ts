import { Router, Request, Response } from 'express';

import CustomerRoute from './customer.route';
import AddresseRoute from './address.route';

const Routes = Router();

function logReq(req: Request, res: Response, next: any): void {
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}


Routes.use(logReq);
Routes.use('/customer', CustomerRoute);
Routes.use('/address', AddresseRoute);

export default Routes;
