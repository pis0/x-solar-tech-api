import { getCustomRepository } from 'typeorm';
import AddressRepository from '../../repositories/customer/address.repository';
import ApiError from '../../errors/api.error';

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
