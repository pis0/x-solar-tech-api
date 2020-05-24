import express, { Router } from 'express';
import ListAddressService from '../services/address/list.address.service';
import CreateAddressService from '../services/address/create.address.service';
import UpdateAddressService from '../services/address/update.address.service';
import RemoveAddressService from '../services/address/remove.address.service';

const AddressesRoute = Router();
AddressesRoute.use(express.json());


AddressesRoute.get('/', async (req, res) => {
  const { customer_id } = req.query;

  const listAddressService = new ListAddressService();
  try {
    const list = await listAddressService.run(customer_id?.toString());
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


AddressesRoute.post('/', async (req, res) => {
  const {
    customer_id,
    number,
    street,
    details,
    type,
    city,
    state,
    zipCode,
    country,
  } = req.body;
  const createAddressService = new CreateAddressService();
  try {
    const address = await createAddressService.run({
      customer_id,
      number,
      street,
      details,
      type,
      city,
      state,
      zipCode,
      country,
    });
    return res.json(address);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


AddressesRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    number,
    street,
    details,
    type,
    city,
    state,
    zipCode,
    country,
  } = req.body;
  const updateAddressService = new UpdateAddressService();
  try {
    const updatedAddress = await updateAddressService.run(id, {
      number,
      street,
      details,
      type,
      city,
      state,
      zipCode,
      country,
    });
    return res.json(updatedAddress);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


AddressesRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeAddressService = new RemoveAddressService();
  try {
    await removeAddressService.run(id);
    return res.send();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default AddressesRoute;
