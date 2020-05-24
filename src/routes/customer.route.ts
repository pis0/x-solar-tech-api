import express, { Router, Request, Response } from 'express';
import { isUuid } from 'uuidv4';
import CreateCustomerService from '../services/customer/create.customer.service';
import UpdateCustomerService from '../services/customer/update.customer.service';
import RemoveCustomerService from '../services/customer/remove.customer.service';
import ListCustomerService from '../services/customer/list.customer.service';

const CustomersRoute = Router();

function validateCustomerId(req: Request, res: Response, next: any): any {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      error: 'invalid customer id.',
    });
  }
  return next();
}

CustomersRoute.use('/:id', validateCustomerId);
CustomersRoute.use(express.json());


CustomersRoute.get('/', async (req, res) => {
  const listCustomerService = new ListCustomerService();
  try {
    const list = await listCustomerService.run();
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


CustomersRoute.post('/', async (req, res) => {
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


CustomersRoute.put('/:id', async (req, res) => {
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


CustomersRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeCustomerService = new RemoveCustomerService();
  try {
    await removeCustomerService.run(id);
    return res.send();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default CustomersRoute;
