import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('address_types')
class AddressTypeModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  label: string;
}

export default AddressTypeModel;
