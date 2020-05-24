
import { EntityRepository, Repository } from 'typeorm';
import CustomerModel from '../../models/customer/customer.model';

@EntityRepository(CustomerModel)
class CustomerRepository extends Repository<CustomerModel> {
  public async checkCpf(cpf: string): Promise<CustomerModel | null> {
    const findCustomer = await this.findOne({
      where: { cpf },
    });
    return findCustomer || null;
  }

  public async checkEmail(email: string): Promise<CustomerModel | null> {
    const findCustomer = await this.findOne({
      where: { email },
    });
    return findCustomer || null;
  }

  public async checkName(name: string): Promise<CustomerModel | null> {
    const findCustomer = await this.findOne({
      where: { name },
    });
    return findCustomer || null;
  }

  public async findCustomerById(id: string): Promise<CustomerModel | null> {
    const findCustomer = await this.findOne({
      where: { id },
    });
    return findCustomer || null;
  }
}

export default CustomerRepository;
