import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import IAddressRepository from '@modules/customer/repositories/iaddress.repository';

@injectable()
class RemoveAddressService {
  private addressRepository: IAddressRepository;

  constructor(
      @inject('AddressRepository')
        addressRepository: IAddressRepository,
  ) {
    this.addressRepository = addressRepository;
  }

  public async run(id: string): Promise<void> {
    const address = await this.addressRepository.findAddressById(id);
    if (!address) {
      throw new ApiError('address not found.');
    }
    await this.addressRepository.remove(address);
  }
}

export default RemoveAddressService;
