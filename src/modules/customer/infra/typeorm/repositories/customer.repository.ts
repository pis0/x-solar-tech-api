
import { getRepository, Repository } from 'typeorm';
import CustomerModel from '@modules/customer/infra/typeorm/entities/customer.entity';
import ICustomerRepository from '@modules/customer/repositories/icustomer.repository';
import ICustomerDto from '@modules/customer/dto/icustomer.dto';

class CustomerRepository
implements ICustomerRepository {
    private repository: Repository<CustomerModel>;

    constructor() {
      this.repository = getRepository(CustomerModel);
    }

    private async findOne(value: string): Promise<CustomerModel | undefined> {
      return this.repository.findOne({
        where: { value },
      });
    }

    public async checkCpf(cpf: string): Promise<CustomerModel | undefined> {
      return this.findOne(cpf);
    }

    public async checkEmail(email: string): Promise<CustomerModel | undefined> {
      return this.findOne(email);
    }

    public async checkName(name: string): Promise<CustomerModel | undefined> {
      return this.findOne(name);
    }

    public async findCustomerById(id: string): Promise<CustomerModel | undefined> {
      return this.findOne(id);
    }

    public async create({
      name,
      cpf,
      phone,
      email,
    }: ICustomerDto): Promise<CustomerModel> {
      const customer = this.repository.create({
        name,
        cpf,
        phone,
        email,
      });

      // await this.repository.save(customer);
      // return customer;

      return this.repository.save(customer);
    }

    public async find(): Promise<CustomerModel[]> {
      return this.repository.find();
    }

    public async remove(addressModel: CustomerModel): Promise<CustomerModel> {
      return this.repository.remove(addressModel);
    }

    public async save(addressModel: CustomerModel): Promise<CustomerModel> {
      return this.repository.save(addressModel);
    }
}

export default CustomerRepository;
