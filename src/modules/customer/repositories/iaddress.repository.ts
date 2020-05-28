import AddressModel from '@modules/customer/infra/typeorm/entities/address.entity';
import IAddressDto from '@modules/customer/dto/iaddress.dto';

export default interface IAddressRepository {
  findAddressById(id: string): Promise<AddressModel | undefined>;
  findAddressesByCustomerId(customer_id: string): Promise<AddressModel[] | undefined>;
  create(data: IAddressDto): Promise<AddressModel>;
  find(): Promise<AddressModel[]>;
  remove(addressModel: AddressModel): Promise<AddressModel>;
  save(addressModel: AddressModel): Promise<AddressModel>;
  // eslint-disable-next-line semi
}
