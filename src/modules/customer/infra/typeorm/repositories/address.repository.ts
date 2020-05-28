
import { getRepository, Repository } from 'typeorm';
import AddressModel from '@modules/customer/infra/typeorm/entities/address.entity';
import IAddressRepository from '@modules/customer/repositories/iaddress.repository';
import IAddressDto from '@modules/customer/dto/iaddress.dto';


class AddressRepository implements IAddressRepository {
  private repository: Repository<AddressModel>;

  constructor() {
    this.repository = getRepository(AddressModel);
  }

  public async findAddressById(id: string): Promise<AddressModel | undefined> {
    const findAddress = await this.repository.findOne({
      where: { id },
    });
    return findAddress;
  }

  public async findAddressesByCustomerId(customer_id: string): Promise<AddressModel[] | undefined> {
    const findAddresses = await this.repository.find({
      where: { customer_id },
    });
    return findAddresses;
  }

  public async create({
    customer_id,
    number,
    street,
    details,
    type,
    city,
    state,
    zipCode,
    country,
    priority,
  }: IAddressDto): Promise<AddressModel> {
    const address = this.repository.create({
      customer_id,
      number,
      street,
      details,
      type,
      city,
      state,
      zipCode,
      country,
      priority,
    });

    // await this.repository.save(address);
    // return address;

    return this.repository.save(address);
  }

  public async find(): Promise<AddressModel[]> {
    return this.repository.find();
  }

  public async remove(addressModel: AddressModel): Promise<AddressModel> {
    return this.repository.remove(addressModel);
  }

  public async save(addressModel: AddressModel): Promise<AddressModel> {
    return this.repository.save(addressModel);
  }
}

export default AddressRepository;
