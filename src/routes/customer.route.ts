import express, { Router } from 'express';
import CreateCustomerService from '../services/customer/create.customer.service';
import UpdateCustomerService from '../services/customer/update.customer.service';
import RemoveCustomerService from '../services/customer/remove.customer.service';
import ListCustomerService from '../services/customer/list.customer.service';

const CustomerRoute = Router();

CustomerRoute.use(express.json());


CustomerRoute.get('/', async (req, res) => {
  const listCustomerService = new ListCustomerService();
  try {
    const list = await listCustomerService.run();
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


CustomerRoute.post('/', async (req, res) => {
  const {
    name, cpf, phone, email,
  } = req.body;
  const createCustomerService = new CreateCustomerService();
  try {
    const customer = await createCustomerService.run({
      name, cpf, phone, email,
    });
    return res.json(customer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


CustomerRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name, cpf, phone, email,
  } = req.body;
  const updateCustomerService = new UpdateCustomerService();
  try {
    const updatedCustomer = await updateCustomerService.run(id, {
      name, cpf, phone, email,
    });
    return res.json(updatedCustomer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


CustomerRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeCustomerService = new RemoveCustomerService();
  try {
    await removeCustomerService.run(id);
    return res.send();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default CustomerRoute;
