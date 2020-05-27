import { getCustomRepository } from 'typeorm';
import ApiError from '@domain/errors/api.error';
import CustomerRepository from '@modules/customer/repositories/customer.repository';

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
