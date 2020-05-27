import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../../repositories/customer/customer.repository';
import ApiError from '../../errors/api.error';

class RemoveCustomerService {
  public async run(id: string): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findCustomerById(id);
    if (!customer) {
      throw new ApiError('customer not found.');
    }

    await customerRepository.remove(customer);
  }
}

export default RemoveCustomerService;
