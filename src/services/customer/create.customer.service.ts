import { getCustomRepository } from 'typeorm';
import CustomerModel from '../../models/customer/customer.model';
import CustomerRepository from '../../repositories/customer/customer.repository';
import ApiError from '../../errors/api.error';

interface CustomerDto {
  name: string;
  cpf: string;
  phone: string;
  email: string;
}

class CreateCustomerService {
  public async run({
    name, cpf, phone, email,
  }: CustomerDto): Promise<CustomerModel> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const nameAlreadyExists = await customerRepository.checkName(name);
    if (nameAlreadyExists) {
      throw new ApiError('name already exists.');
    }

    const cpfAlreadyExists = await customerRepository.checkCpf(cpf);
    if (cpfAlreadyExists) {
      throw new ApiError('CPF already exists.');
    }

    const emailAlreadyExists = await customerRepository.checkEmail(email);
    if (emailAlreadyExists) {
      throw new ApiError('email already exists.');
    }

    const customer = customerRepository.create({
      name, cpf, phone, email,
    });

    await customerRepository.save(customer);


    return customer;
  }
}


export default CreateCustomerService;
