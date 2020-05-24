import { getCustomRepository } from 'typeorm';
import AddressRepository from '../../repositories/address.repository';

class RemoveAddressService {
  public async run(id: string): Promise<void> {
    const addressRepository = getCustomRepository(AddressRepository);
    const address = await addressRepository.findAddressById(id);
    if (!address) {
      throw new Error('address not found.');
    }
    await addressRepository.remove(address);
  }
}

export default RemoveAddressService;
