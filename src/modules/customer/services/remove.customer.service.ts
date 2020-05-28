import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import ICustomerRepository from '@modules/customer/repositories/icustomer.repository';

@injectable()
class RemoveCustomerService {
  private customerRepository: ICustomerRepository;

  constructor(
      @inject('CustomerRepository')
        customerRepository: ICustomerRepository,
  ) {
    this.customerRepository = customerRepository;
  }

  public async run(id: string): Promise<void> {
    const customer = await this.customerRepository.findCustomerById(id);
    if (!customer) {
      throw new ApiError('customer not found.');
    }

    await this.customerRepository.remove(customer);
  }
}

export default RemoveCustomerService;
