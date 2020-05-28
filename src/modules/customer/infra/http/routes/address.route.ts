import express, { Router } from 'express';
import { container } from 'tsyringe';
import ListAddressService from '@modules/customer/services/list.address.service';
import CreateAddressService from '@modules/customer/services/create.address.service';
import UpdateAddressService from '@modules/customer/services/update.address.service';
import RemoveAddressService from '@modules/customer/services/remove.address.service';
import ListAddressTypeService from '@modules/customer/services/list.address.type.service';


const AddressRoute = Router();
AddressRoute.use(express.json());


AddressRoute.get('/', async (req, res) => {
  const { customer_id } = req.query;

  const listAddressService = container.resolve(ListAddressService);

  const list = await listAddressService.run(customer_id?.toString());
  return res.json(list);
});

AddressRoute.get('/types/', async (req, res) => {
  const listAddressTypeService = container.resolve(ListAddressTypeService);

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
  const createAddressService = container.resolve(CreateAddressService);

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
  const updateAddressService = container.resolve(UpdateAddressService);

  const updatedAddress = await updateAddressService.run(id, {
    customer_id: '', // useless for update service
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
  const removeAddressService = container.resolve(RemoveAddressService);

  await removeAddressService.run(id);
  return res.send();
});


export default AddressRoute;
