import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('address_types')
class AddressTypeModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;
}

export default AddressTypeModel;
