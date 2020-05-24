
import { EntityRepository, Repository } from 'typeorm';
import AddressModel from '../../models/customer/address.model';

@EntityRepository(AddressModel)
class AddressRepository extends Repository<AddressModel> {
  public async findAddressById(id: string): Promise<AddressModel | null> {
    const findAddress = await this.findOne({
      where: { id },
    });
    return findAddress || null;
  }

  public async findAddressesByCustomerId(customer_id: string): Promise<AddressModel[] | null> {
    const findAddresses = await this.find({
      where: { customer_id },
    });
    return findAddresses || null;
  }
}

export default AddressRepository;
