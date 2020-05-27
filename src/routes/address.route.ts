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

  const list = await listAddressService.run(customer_id?.toString());
  return res.json(list);
});

AddressRoute.get('/types/', async (req, res) => {
  const listAddressTypeService = new ListAddressTypeService();

  const list = await listAddressTypeService.run();
  return res.json(list);
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
});


AddressRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeAddressService = new RemoveAddressService();

  await removeAddressService.run(id);
  return res.send();
});


export default AddressRoute;
