import express, { Router } from 'express';
import ListAddressService from '../services/customer/list.address.service';
import CreateAddressService from '../services/customer/create.address.service';
import UpdateAddressService from '../services/customer/update.address.service';
import RemoveAddressService from '../services/customer/remove.address.service';
import ListAddressTypeService from '../services/customer/list.address.type.service';

const AddressRoute = Router();
AddressRoute.use(express.json());


AddressRoute.get('/', async (req, res) => {
  const { customer_id } = req.query;

  const listAddressService = new ListAddressService();
  try {
    const list = await listAddressService.run(customer_id?.toString());
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

AddressRoute.get('/types/', async (req, res) => {
  const listAddressTypeService = new ListAddressTypeService();
  try {
    const list = await listAddressTypeService.run();
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


AddressRoute.post('/', async (req, res) => {
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
    priority,
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
      priority,
    });
    return res.json(address);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


AddressRoute.put('/:id', async (req, res) => {
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
    priority,
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
      priority,
    });
    return res.json(updatedAddress);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


AddressRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeAddressService = new RemoveAddressService();
  try {
    await removeAddressService.run(id);
    return res.send();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default AddressRoute;
