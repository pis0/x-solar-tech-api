import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import IAddressTypeRepository from '@modules/customer/repositories/iaddress.type.repository';

@injectable()
class ListAddressTypeService {
  private addressTypeRepository: IAddressTypeRepository;

  constructor(
      @inject('AddressTypeRepository')
        addressTypeRepository: IAddressTypeRepository,
  ) {
    this.addressTypeRepository = addressTypeRepository;
  }

  public async run(): Promise<any[]> {
    const types = await this.addressTypeRepository.find();
    if (!types) {
      throw new ApiError('no types.');
    }
    return types;
  }
}

export default ListAddressTypeService;
