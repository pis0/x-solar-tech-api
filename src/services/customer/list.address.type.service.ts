import { getCustomRepository } from 'typeorm';
import AddressTypeModel from '../../models/customer/address.type.model';
import AddressTypeRepository from '../../repositories/customer/address.type.repository';


class ListAddressTypeService {
  public async run(): Promise<AddressTypeModel[]> {
    const addressTypeRepository = getCustomRepository(AddressTypeRepository);
    const types = await addressTypeRepository.find();
    if (!types) {
      throw new Error('no types.');
    }
    return types;
  }
}

export default ListAddressTypeService;
