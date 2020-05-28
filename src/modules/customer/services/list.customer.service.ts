import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import ICustomerRepository from '@modules/customer/repositories/icustomer.repository';

@injectable()
class ListCustomerService {
  private customerRepository: ICustomerRepository;

  constructor(
      @inject('CustomerRepository')
        customerRepository: ICustomerRepository,
  ) {
    this.customerRepository = customerRepository;
  }


  public async run(): Promise<any[]> {
    const customers = await this.customerRepository.find();
    if (!customers?.length) {
      throw new ApiError('no customers.');
    }
    return customers;
  }
}

export default ListCustomerService;
