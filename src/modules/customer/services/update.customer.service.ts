import { getCustomRepository } from 'typeorm';
import ApiError from '@domain/errors/api.error';
import CustomerModel from '@modules/customer/infra/typeorm/entities/customer.entity';
import CustomerRepository from '@modules/customer/repositories/customer.repository';

interface CustomerDto {
  name: string;
  cpf: string;
  phone: string;
  email: string;
}

class UpdateCustomerService {
  public async run(id: string,
    {
      name, cpf, phone, email,
    }: CustomerDto): Promise<CustomerModel> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findCustomerById(id);
    if (!customer) {
      throw new ApiError('customer not found.');
    }
    if (name) customer.name = name;
    if (cpf) customer.cpf = cpf;
    if (phone) customer.phone = phone;
    if (email) customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
