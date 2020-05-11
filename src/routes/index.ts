import { Router, Request, Response } from 'express';
import CustomersRoute from './customers.route';

const Routes = Router();

function logReq(req: Request, res: Response, next: any): void {
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

Routes.use(logReq);
Routes.use('/customers', CustomersRoute);

export default Routes;
