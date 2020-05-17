import { getCustomRepository } from 'typeorm';
import CustomerModel from '../../models/customer/customer.model';
// import AddressesModel from '../../models/customer/addresses.model';
import CustomerRepository from '../../repositories/customers.repository';


interface CustomerDto {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  // address: AddressesModel;
}

class CreateCustomerService {
  // private customerRepository: CustomerRepository;
  // constructor(customerRepository: CustomerRepository) {
  //   this.customerRepository = customerRepository;
  // }


  public async run({
    name, cpf, phone, email, // , address,
  }: CustomerDto): Promise<CustomerModel> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const cpfAlreadyExists = await customerRepository.checkCpf(cpf);
    if (cpfAlreadyExists) {
      throw new Error('CPF already exists.');
    }

    const emailAlreadyExists = await customerRepository.checkEmail(email);
    if (emailAlreadyExists) {
      throw new Error('email already exists.');
    }

    const customer = customerRepository.create({
      name, cpf, phone, email, // , address,
    });

    await customerRepository.save(customer);


    return customer;
  }
}


export default CreateCustomerService;
