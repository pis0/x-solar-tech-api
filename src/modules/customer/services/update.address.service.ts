import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import IAddressDto from '@modules/customer/dto/iaddress.dto';
import IAddressRepository from '@modules/customer/repositories/iaddress.repository';


@injectable()
class UpdateAddressService {
  private addressRepository: IAddressRepository;

  constructor(
    @inject('AddressRepository')
      addressRepository: IAddressRepository,
  ) {
    this.addressRepository = addressRepository;
  }


  public async run(id: string,
    {
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
    const address = await this.addressRepository.findAddressById(id);
    if (!address) {
      throw new ApiError('address not found.');
    }
    if (number) address.number = number;
    if (street) address.street = street;
    if (details) address.details = details;
    if (type) address.type = type;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipCode) address.zipCode = zipCode;
    if (country) address.country = country;
    if (priority) address.priority = priority;

    // await this.addressRepository.save(address);
    // return address;
    return this.addressRepository.save(address);
  }
}

export default UpdateAddressService;
