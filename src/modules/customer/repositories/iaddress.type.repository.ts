
import AddressTypeModel from '@modules/customer/infra/typeorm/entities/address.type.entity';

export default interface IAddressTypeRepository {
  findAddressTypeById(id: string): Promise<AddressTypeModel | undefined>;
  find(): Promise<AddressTypeModel[]>;
  // eslint-disable-next-line semi
}
