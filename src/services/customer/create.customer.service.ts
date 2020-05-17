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

class CreateCustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public run({
    name, cpf, phone, email, address,
  }: CustomerDto): CustomerModel {
    const cpfAlreadyExists = this.customerRepository.checkCpf(cpf);
    if (cpfAlreadyExists) {
      throw new Error('CPF already exists.');
    }

    const emailAlreadyExists = this.customerRepository.checkEmail(email);
    if (emailAlreadyExists) {
      throw new Error('email already exists.');
    }

    const customer = this.customerRepository.create({
      name, cpf, phone, email, address,
    });


    return customer;
  }
}


export default CreateCustomerService;
