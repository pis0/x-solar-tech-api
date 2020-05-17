import CustomerModel from '../../models/customer/customer.model';
import AddressesModel from '../../models/customer/addresses.model';
import CustomerRepository from '../../repositories/customers.repository';

interface CustomerDto {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: AddressesModel;
}

class UpdateCustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public run(id: string,
    {
      name, cpf, phone, email, address,
    }: CustomerDto): CustomerModel | null {
    const customer = this.customerRepository.findCustomerById(id);
    if (!customer) {
      throw new Error('customer not found.');
    }
    const updatedCustomer = this.customerRepository.update(id, {
      name, cpf, phone, email, address,
    });

    return updatedCustomer;
  }
}

export default UpdateCustomerService;
