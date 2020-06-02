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


  public async run(id: string | null): Promise<any[] | any> {
    const customers = id
      ? await this.customerRepository.findCustomerById(id)
      : await this.customerRepository.find();
    if (!customers) {
      throw new ApiError('no customers.');
    }
    return customers;
  }
}

export default ListCustomerService;
