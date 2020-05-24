import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../../repositories/customer/customer.repository';

class RemoveCustomerService {
  public async run(id: string): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findCustomerById(id);
    if (!customer) {
      throw new Error('customer not found.');
    }

    await customerRepository.remove(customer);
  }
}

export default RemoveCustomerService;
