import express, { Router, Request, Response } from 'express';
import { isUuid } from 'uuidv4';
import CustomerRepository from '../repositories/customers.repository';


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
  const results = customerRepository.list(name ? name.toString() : null);
  return res.json(results);
});


CustomersRoute.post('/', (req, res) => {
  const {
    name, cpf, phone, email, address,
  } = req.body;

  const cpfAlreadyExists = customerRepository.checkCpf(cpf);
  if (cpfAlreadyExists) {
    return res.status(400).json({ message: 'CPF already exists.' });
  }

  const emailAlreadyExists = customerRepository.checkEmail(email);
  if (emailAlreadyExists) {
    return res.status(400).json({ message: 'email already exists.' });
  }

  const customer = customerRepository.create({
    name, cpf, phone, email, address,
  });

  return res.json(customer);
});


CustomersRoute.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    name, cpf, phone, email, address,
  } = req.body;
  const customer = customerRepository.findCustomerById(id);
  if (!customer) {
    return res.status(400).json({ error: 'customer not found.' });
  }
  const updatedCustomer = customerRepository.update(id, {
    name, cpf, phone, email, address,
  });

  return res.json(updatedCustomer);
});


CustomersRoute.delete('/:id', (req, res) => {
  const { id } = req.params;
  const customer = customerRepository.findCustomerById(id);
  if (!customer) {
    return res.status(400).json({ error: 'customer not found.' });
  }
  customerRepository.remove(id);
  return res.status(200).send();
});


export default CustomersRoute;
