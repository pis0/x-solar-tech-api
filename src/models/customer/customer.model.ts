import { uuid } from 'uuidv4';
import AddressesModel from './addresses.model';

class CustomerModel {
  id: string;

  name: string;

  cpf: string;

  phone: string;

  email: string;

  address: AddressesModel;

  constructor({
    name, cpf, phone, email, address,
  }: Omit<CustomerModel, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}

export default CustomerModel;
