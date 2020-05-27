import { getCustomRepository } from 'typeorm';
import AddressModel from '../../models/customer/address.model';
import AddressRepository from '../../repositories/customer/address.repository';
import ApiError from '../../errors/api.error';

class ListAddressService {
  public async run(customer_id: string | null): Promise<AddressModel[]> {
    const addressRepository = getCustomRepository(AddressRepository);
    const addresses = customer_id
      ? await addressRepository.findAddressesByCustomerId(customer_id)
      : await addressRepository.find();
    if (!addresses?.length) {
      throw new ApiError('no addresses.');
    }
    return addresses;
  }
}

export default ListAddressService;
