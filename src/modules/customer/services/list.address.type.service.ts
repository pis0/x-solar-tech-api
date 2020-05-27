import { getCustomRepository } from 'typeorm';
import ApiError from '@domain/errors/api.error';
import AddressTypeModel from '@modules/customer/infra/typeorm/entities/address.type.entity';
import AddressTypeRepository from '@modules/customer/repositories/address.type.repository';

class ListAddressTypeService {
  public async run(): Promise<AddressTypeModel[]> {
    const addressTypeRepository = getCustomRepository(AddressTypeRepository);
    const types = await addressTypeRepository.find();
    if (!types) {
      throw new ApiError('no types.');
    }
    return types;
  }
}

export default ListAddressTypeService;
