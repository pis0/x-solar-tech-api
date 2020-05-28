import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import ICustomerDto from '@modules/customer/dto/icustomer.dto';
import ICustomerRepository from '@modules/customer/repositories/icustomer.repository';

@injectable()
class CreateCustomerService {
  private customerRepository: ICustomerRepository;

  constructor(
      @inject('CustomerRepository')
        customerRepository: ICustomerRepository,
  ) {
    this.customerRepository = customerRepository;
  }

  public async run({
    name, cpf, phone, email,
  }: ICustomerDto): Promise<any> {
    const nameAlreadyExists = await this.customerRepository.checkName(name);
    if (nameAlreadyExists) {
      throw new ApiError('name already exists.');
    }

    const cpfAlreadyExists = await this.customerRepository.checkCpf(cpf);
    if (cpfAlreadyExists) {
      throw new ApiError('CPF already exists.');
    }

    const emailAlreadyExists = await this.customerRepository.checkEmail(email);
    if (emailAlreadyExists) {
      throw new ApiError('email already exists.');
    }

    const customer = this.customerRepository.create({
      name, cpf, phone, email,
    });

    return customer;
  }
}


export default CreateCustomerService;
