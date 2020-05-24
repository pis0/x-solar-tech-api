import { getCustomRepository } from 'typeorm';
import AddressModel from '../../models/customer/address.model';
import AddressRepository from '../../repositories/address.repository';

interface AddressDto {
  number: number;
  street: string;
  details: string;
  type: number;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

class UpdateAddressService {
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
    }: AddressDto): Promise<AddressModel> {
    const addressRepository = getCustomRepository(AddressRepository);

    const address = await addressRepository.findAddressById(id);
    if (!address) {
      throw new Error('address not found.');
    }
    if (number) address.number = number;
    if (street) address.street = street;
    if (details) address.details = details;
    if (type) address.type = type;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipCode) address.zipCode = zipCode;
    if (country) address.country = country;

    await addressRepository.save(address);

    return address;
  }
}

export default UpdateAddressService;
