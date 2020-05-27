import { getCustomRepository } from 'typeorm';
import ApiError from '@domain/errors/api.error';
import CustomerModel from '@modules/customer/infra/typeorm/entities/customer.entity';
import CustomerRepository from '@modules/customer/repositories/customer.repository';

class ListCustomerService {
  public async run(): Promise<CustomerModel[]> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.find();
    if (!customers?.length) {
      throw new ApiError('no customers.');
    }
    return customers;
  }
}

export default ListCustomerService;
