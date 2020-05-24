import { getCustomRepository } from 'typeorm';
import AddressModel from '../../models/customer/address.model';
import AddressRepository from '../../repositories/address.repository';


interface AddressDto {
  customer_id: string;
  number: number;
  street: string;
  details: string;
  type: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  priority: number;
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
    priority,
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
      priority,
    });
    await addressRepository.save(address);
    return address;
  }
}


export default CreateAddressService;
