import CustomerRepository from '../../repositories/customers.repository';

class RemoveCustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public run(id: string): void {
    const customer = this.customerRepository.findCustomerById(id);
    if (!customer) {
      throw new Error('customer not found.');
    }
    this.customerRepository.remove(id);
  }
}

export default RemoveCustomerService;
