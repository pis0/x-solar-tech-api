
import CustomerModel from '../models/customer/customer.model';
import AddressesModel from '../models/customer/addresses.model';
import AddressModel from '../models/customer/address.model';


interface CustomerDto {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: AddressesModel;
}


class CustomerRepository {
  private CUSTOMERS: CustomerModel[];

  constructor() {
    this.CUSTOMERS = [];
  }

  public list(name: string | null): CustomerModel[] {
    const results = name
      ? this.CUSTOMERS.filter((c) => c.name.includes(name.toString()))
      : this.CUSTOMERS;
    return results;
  }

  public create({
    name, cpf, phone, email, address,
  }: CustomerDto): CustomerModel {
    let mainAddress: AddressModel = new AddressModel();
    const additionalAddresses: AddressModel[] = [];
    if (address) {
      const { main, others }: AddressesModel = address;
      if (others) {
        others.forEach((a, i) => {
          additionalAddresses[i] = new AddressModel();
          additionalAddresses[i] = { ...additionalAddresses[i], ...a };
        });
      }
      if (main) {
        mainAddress = { ...mainAddress, ...main };
      }
    }

    const addresses: AddressesModel = new AddressesModel({
      main: mainAddress,
      others: additionalAddresses,
    });

    const customer = new CustomerModel({
      name, cpf, phone, email, address: addresses,
    });
    this.CUSTOMERS.push(customer);

    return customer;
  }

  public remove(id: string): void {
    const customerIndex = this.CUSTOMERS.findIndex((c) => c.id === id);
    if (customerIndex >= 0) this.CUSTOMERS.splice(customerIndex, 1);
  }

  public update(
    id: string,
    {
      name, cpf, phone, email, address,
    }: CustomerDto,
  ): CustomerModel | null {
    const customer = this.findCustomerById(id);
    if (customer) {
      if (name) customer.name = name;
      if (cpf) customer.cpf = cpf;
      if (phone) customer.phone = phone;
      if (email) customer.email = email;
      if (address) {
        const { main, others }: AddressesModel = address;
        if (others) {
          others.forEach((a, i) => {
            if (!customer?.address?.others?.[i]) {
              customer.address.others[i] = new AddressModel();
            }
            customer.address.others[i] = { ...customer.address.others[i], ...a };
          });
        } else customer.address.others = [];
        if (main) {
          customer.address.main = { ...customer.address.main, ...main };
        }
      }
    }

    return customer;
  }

  public checkCpf(cpf: string): CustomerModel | null {
    const customer = this.CUSTOMERS.find((c) => c.cpf === cpf);
    return customer || null;
  }

  public checkEmail(email: string): CustomerModel | null {
    const customer = this.CUSTOMERS.find((c) => c.email === email);
    return customer || null;
  }

  public findCustomerById(id: string): CustomerModel | null {
    const customer = this.CUSTOMERS.find((c) => c.id === id);
    return customer || null;
  }
}

export default CustomerRepository;
