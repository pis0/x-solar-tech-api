
import { EntityRepository, Repository } from 'typeorm';
import AddressTypeModel from '@modules/customer/infra/typeorm/entities/address.type.entity';

@EntityRepository(AddressTypeModel)
class AddressTypeRepository extends Repository<AddressTypeModel> {
  public async findAddressTypeById(id: string): Promise<AddressTypeModel | null> {
    const findAddressType = await this.findOne({
      where: { id },
    });
    return findAddressType || null;
  }
}

export default AddressTypeRepository;
