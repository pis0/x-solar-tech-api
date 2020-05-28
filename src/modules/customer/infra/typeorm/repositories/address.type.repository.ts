
import { getRepository, Repository } from 'typeorm';
import AddressTypeModel from '@modules/customer/infra/typeorm/entities/address.type.entity';
import IAddressTypeRepository from '@modules/customer/repositories/iaddress.type.repository';

class AddressTypeRepository implements IAddressTypeRepository {
    private repository: Repository<AddressTypeModel>;

    constructor() {
      this.repository = getRepository(AddressTypeModel);
    }

    public async findAddressTypeById(id: string): Promise<AddressTypeModel | undefined> {
      const findAddressType = await this.repository.findOne({
        where: { id },
      });
      return findAddressType;
    }

    public async find(): Promise<AddressTypeModel[]> {
      return this.repository.find();
    }
}

export default AddressTypeRepository;
