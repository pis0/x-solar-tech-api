import { Router, Request, Response } from 'express';

import CustomersRoute from './customers.route';
import AddressesRoute from './addresses.route';
import AddressTypesRoute from './address.types.route';

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
Routes.use('/addresses', AddressesRoute);
Routes.use('/address/types', AddressTypesRoute);

export default Routes;
