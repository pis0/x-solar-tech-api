import { Router } from 'express';
import CustomerRoute from '@modules/customer/infra/http/routes/customer.route';
import AddresseRoute from '@modules/customer/infra/http/routes/address.route';
import UserRoute from '@modules/user/infra/http/routes/user.route';
import AuthRoute from '@modules/user/infra/http/routes/auth.route';
import IndexController from '@domain/infra/http/controller/index.controller';

const Routes = Router();

const indexController = new IndexController();

Routes.use(indexController.logReq);
Routes.use('/auth', AuthRoute);
Routes.use('/user', UserRoute);
Routes.use('/customer', indexController.validateToken, CustomerRoute);
Routes.use('/address', indexController.validateToken, AddresseRoute);

export default Routes;
