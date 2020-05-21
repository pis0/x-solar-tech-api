import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import CustomerModel from './customer.model';

@Entity('addresses')
class AddressModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column()
  street: string;

  @Column()
  details: string;

  @Column()
  type: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;

  @Column()
  customer_id: string;

  @ManyToOne(() => CustomerModel)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerModel;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default AddressModel;
