import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import ICustomerDto from '@modules/customer/dto/icustomer.dto';
import ICustomerRepository from '@modules/customer/repositories/icustomer.repository';

@injectable()
class UpdateCustomerService {
  private customerRepository: ICustomerRepository;

  constructor(
      @inject('CustomerRepository')
        customerRepository: ICustomerRepository,
  ) {
    this.customerRepository = customerRepository;
  }


  public async run(id: string,
    {
      name, cpf, phone, email,
    }: ICustomerDto): Promise<any> {
    const customer = await this.customerRepository.findCustomerById(id);
    if (!customer) {
      throw new ApiError('customer not found.');
    }
    if (name) customer.name = name;
    if (cpf) customer.cpf = cpf;
    if (phone) customer.phone = phone;
    if (email) customer.email = email;

    // await this.customerRepository.save(customer);
    // return customer;
    return this.customerRepository.save(customer);
  }
}

export default UpdateCustomerService;
