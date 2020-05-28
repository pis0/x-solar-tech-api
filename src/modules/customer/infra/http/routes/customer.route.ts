import express, { Router } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '@modules/customer/services/create.customer.service';
import UpdateCustomerService from '@modules/customer/services/update.customer.service';
import RemoveCustomerService from '@modules/customer/services/remove.customer.service';
import ListCustomerService from '@modules/customer/services/list.customer.service';

const CustomerRoute = Router();

CustomerRoute.use(express.json());


CustomerRoute.get('/', async (req, res) => {
  const listCustomerService = container.resolve(ListCustomerService);
  const list = await listCustomerService.run();
  return res.json(list);
});


CustomerRoute.post('/', async (req, res) => {
  const {
    name, cpf, phone, email,
  } = req.body;
  const createCustomerService = container.resolve(CreateCustomerService);

  const customer = await createCustomerService.run({
    name, cpf, phone, email,
  });
  return res.json(customer);
});


CustomerRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name, cpf, phone, email,
  } = req.body;
  const updateCustomerService = container.resolve(UpdateCustomerService);

  const updatedCustomer = await updateCustomerService.run(id, {
    name, cpf, phone, email,
  });
  return res.json(updatedCustomer);
});


CustomerRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeCustomerService = container.resolve(RemoveCustomerService);

  await removeCustomerService.run(id);
  return res.send();
});


export default CustomerRoute;
