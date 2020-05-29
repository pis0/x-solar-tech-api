import express, { Router } from 'express';
import AddressController from '@modules/customer/infra/http/controllers/address.cotroller';

const AddressRoute = Router();
AddressRoute.use(express.json());

const addressController = new AddressController();

AddressRoute.get('/types/', addressController.listTypes);
AddressRoute.get('/', addressController.list);
AddressRoute.post('/', addressController.create);
AddressRoute.put('/:id', addressController.update);
AddressRoute.delete('/:id', addressController.remove);


export default AddressRoute;
