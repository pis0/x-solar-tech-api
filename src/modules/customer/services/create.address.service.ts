import { injectable, inject } from 'tsyringe';
import IAddressDto from '@modules/customer/dto/iaddress.dto';
import IAddressRepository from '@modules/customer/repositories/iaddress.repository';


@injectable()
class CreateAddressService {
  private addressRepository: IAddressRepository;

  constructor(
      @inject('AddressRepository')
        addressRepository: IAddressRepository,
  ) {
    this.addressRepository = addressRepository;
  }


  public async run({
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
  }: IAddressDto): Promise<any> {
    const address = await this.addressRepository.create({
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

    return address;
  }
}


export default CreateAddressService;
