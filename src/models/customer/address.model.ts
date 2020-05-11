import { uuid } from 'uuidv4';

class AddressModel {
  id: string;

  number: number;

  street: string;

  details: string;

  type: number;

  city: string;

  state: string;

  zipCode: string;

  country: string;

  constructor() {
    this.id = uuid();
    this.number = 0;
    this.street = '';
    this.details = '';
    this.type = 0;
    this.city = '';
    this.state = '';
    this.zipCode = '';
    this.country = '';
  }
}

export default AddressModel;
