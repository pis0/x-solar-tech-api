import { getCustomRepository } from 'typeorm';
import ApiError from '@domain/errors/api.error';
import AddressRepository from '@modules/customer/repositories/address.repository';

class RemoveAddressService {
  public async run(id: string): Promise<void> {
    const addressRepository = getCustomRepository(AddressRepository);
    const address = await addressRepository.findAddressById(id);
    if (!address) {
      throw new ApiError('address not found.');
    }
    await addressRepository.remove(address);
  }
}

export default RemoveAddressService;
