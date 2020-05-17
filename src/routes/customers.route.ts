import express, { Router, Request, Response } from 'express';
import { isUuid } from 'uuidv4';
import CustomerRepository from '../repositories/customers.repository';
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


const customerRepository = new CustomerRepository();

CustomersRoute.get('/', (req, res) => {
  const { name } = req.query;
  const listCustomerService = new ListCustomerService(customerRepository);
  return res.json(listCustomerService.run(name ? name.toString() : null));
});


CustomersRoute.post('/', (req, res) => {
  const {
    name, cpf, phone, email, address,
  } = req.body;
  const createCustomerService = new CreateCustomerService(customerRepository);
  try {
    const customer = createCustomerService.run({
      name, cpf, phone, email, address,
    });
    return res.json(customer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


CustomersRoute.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    name, cpf, phone, email, address,
  } = req.body;
  const updateCustomerService = new UpdateCustomerService(customerRepository);
  try {
    const updatedCustomer = updateCustomerService.run(id, {
      name, cpf, phone, email, address,
    });
    return res.json(updatedCustomer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


CustomersRoute.delete('/:id', (req, res) => {
  const { id } = req.params;
  const removeCustomerService = new RemoveCustomerService(customerRepository);
  try {
    removeCustomerService.run(id);
    return res.send();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default CustomersRoute;
