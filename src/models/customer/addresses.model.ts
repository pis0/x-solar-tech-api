import AddressModel from './address.model';

class AddressesModel {
  main: AddressModel;

  others: AddressModel[];

  constructor({ main, others }: AddressesModel) {
    this.main = main;
    this.others = others;
  }
}

export default AddressesModel;
