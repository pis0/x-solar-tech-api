import { getCustomRepository } from 'typeorm';
import CustomerModel from '../../models/customer/customer.model';
import CustomerRepository from '../../repositories/customer/customer.repository';
import ApiError from '../../errors/api.error';

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
