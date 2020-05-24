import express, { Router } from 'express';
import ListAddressTypeService from '../services/address/list.address.type.service';

const AddressTypesRoute = Router();
AddressTypesRoute.use(express.json());


AddressTypesRoute.get('/', async (req, res) => {
  const listAddressTypeService = new ListAddressTypeService();
  try {
    const list = await listAddressTypeService.run();
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default AddressTypesRoute;
