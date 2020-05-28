
import CustomerModel from '@modules/customer/infra/typeorm/entities/customer.entity';
import ICustomerDto from '@modules/customer/dto/icustomer.dto';

export default interface ICustomerRepository {
  checkCpf(cpf: string): Promise<CustomerModel | undefined>;
  checkEmail(email: string): Promise<CustomerModel | undefined>;
  checkName(name: string): Promise<CustomerModel | undefined>;
  findCustomerById(id: string): Promise<CustomerModel | undefined>;
  create(data: ICustomerDto): Promise<CustomerModel>;
  find(): Promise<CustomerModel[]>;
  remove(customerModel: CustomerModel): Promise<CustomerModel>;
  save(customerModel: CustomerModel): Promise<CustomerModel>;
  // eslint-disable-next-line semi
}
