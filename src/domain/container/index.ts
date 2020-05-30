import { container } from 'tsyringe';

import ICustomerRepository from '@modules/customer/repositories/icustomer.repository';
import CustomerRepository from '@modules/customer/infra/typeorm/repositories/customer.repository';
import AddressRepository from '@modules/customer/infra/typeorm/repositories/address.repository';
import IAddressRepository from '@modules/customer/repositories/iaddress.repository';
import IAddressTypeRepository from '@modules/customer/repositories/iaddress.type.repository';
import AddressTypeRepository from '@modules/customer/infra/typeorm/repositories/address.type.repository';
import UserRepository from '@modules/user/infra/typeorm/repositories/user.repository';
import IUserRepository from '@modules/user/repositories/iuser.repository';
import IMail from '@domain/container/providers/mail/imail';
import EtherealMailProvider from '@domain/container/providers/mail/ethereal.mail.provider';


container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);
container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
container.registerSingleton<IAddressTypeRepository>(
  'AddressTypeRepository',
  AddressTypeRepository,
);


container.registerInstance<IMail>(
  'MailProvider',
  new EtherealMailProvider(),
);
