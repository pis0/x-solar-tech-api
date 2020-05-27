import express, { Router } from 'express';
import CreateCustomerService from '../services/customer/create.customer.service';
import UpdateCustomerService from '../services/customer/update.customer.service';
import RemoveCustomerService from '../services/customer/remove.customer.service';
import ListCustomerService from '../services/customer/list.customer.service';

const CustomerRoute = Router();

CustomerRoute.use(express.json());


CustomerRoute.get('/', async (req, res) => {
  const listCustomerService = new ListCustomerService();
  const list = await listCustomerService.run();
  return res.json(list);
});


CustomerRoute.post('/', async (req, res) => {
  const {
    name, cpf, phone, email,
  } = req.body;
  const createCustomerService = new CreateCustomerService();

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
  const updateCustomerService = new UpdateCustomerService();

  const updatedCustomer = await updateCustomerService.run(id, {
    name, cpf, phone, email,
  });
  return res.json(updatedCustomer);
});


CustomerRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeCustomerService = new RemoveCustomerService();

  await removeCustomerService.run(id);
  return res.send();
});


export default CustomerRoute;
