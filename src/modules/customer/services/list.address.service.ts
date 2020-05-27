import { getCustomRepository } from 'typeorm';
import ApiError from '@domain/errors/api.error';
import AddressModel from '@modules/customer/infra/typeorm/entities/address.entity';
import AddressRepository from '@modules/customer/repositories/address.repository';

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
