import { getCustomRepository } from 'typeorm';
import AddressModel from '../../models/customer/address.model';
import AddressRepository from '../../repositories/address.repository';


interface AddressDto {
  customer_id: string;
  number: number;
  street: string;
  details: string;
  type: number;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

class CreateAddressService {
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
  }: AddressDto): Promise<AddressModel> {
    const addressRepository = getCustomRepository(AddressRepository);
    const address = addressRepository.create({
      customer_id,
      number,
      street,
      details,
      type,
      city,
      state,
      zipCode,
      country,
    });
    await addressRepository.save(address);
    return address;
  }
}


export default CreateAddressService;
