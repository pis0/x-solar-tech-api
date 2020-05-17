import CustomerModel from '../../models/customer/customer.model';
import CustomerRepository from '../../repositories/customers.repository';


class ListCustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public run(name: string | null): CustomerModel[] {
    const results = this.customerRepository.list(name);
    return results;
  }
}

export default ListCustomerService;
