// import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import AddressesModel from './addresses.model';

@Entity('customers')
class CustomerModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  // address: AddressesModel;

  // constructor({
  //   name, cpf, phone, email, address,
  // }: Omit<CustomerModel, 'id'>) {
  //   this.id = uuid();
  //   this.name = name;
  //   this.cpf = cpf;
  //   this.phone = phone;
  //   this.email = email;
  //   this.address = address;
  // }
}

export default CustomerModel;
