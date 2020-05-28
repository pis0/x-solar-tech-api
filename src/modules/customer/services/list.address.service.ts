import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import IAddressRepository from '@modules/customer/repositories/iaddress.repository';

@injectable()
class ListAddressService {
  private addressRepository: IAddressRepository;

  constructor(
      @inject('AddressRepository')
        addressRepository: IAddressRepository,
  ) {
    this.addressRepository = addressRepository;
  }

  public async run(customer_id: string | null): Promise<any[]> {
    const addresses = customer_id
      ? await this.addressRepository.findAddressesByCustomerId(customer_id)
      : await this.addressRepository.find();
    if (!addresses?.length) {
      throw new ApiError('no addresses.');
    }
    return addresses;
  }
}

export default ListAddressService;
