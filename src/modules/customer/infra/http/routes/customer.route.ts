import express, { Router } from 'express';
import CustomerController from '@modules/customer/infra/http/controllers/customer.cotroller';

const CustomerRoute = Router();
CustomerRoute.use(express.json());

const customerController = new CustomerController();

CustomerRoute.get('/', customerController.list);
CustomerRoute.post('/', customerController.create);
CustomerRoute.put('/:id', customerController.update);
CustomerRoute.delete('/:id', customerController.remove);

export default CustomerRoute;
