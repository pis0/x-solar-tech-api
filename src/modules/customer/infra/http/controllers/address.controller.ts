import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAddressService from '@modules/customer/services/list.address.service';
import ListAddressTypeService from '@modules/customer/services/list.address.type.service';
import CreateAddressService from '@modules/customer/services/create.address.service';
import UpdateAddressService from '@modules/customer/services/update.address.service';
import RemoveAddressService from '@modules/customer/services/remove.address.service';


class AddressController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { customer_id } = req.query;
    const listAddressService = container.resolve(ListAddressService);
    const list = await listAddressService.run(customer_id?.toString());

    return res.json(list);
  }

  public async listTypes(req: Request, res: Response): Promise<Response> {
    const listAddressTypeService = container.resolve(ListAddressTypeService);
    const list = await listAddressTypeService.run();

    return res.json(list);
  }

  public async create(req: Request, res: Response): Promise<Response> {
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
  }

  public async update(req: Request, res: Response): Promise<Response> {
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
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const removeAddressService = container.resolve(RemoveAddressService);
    await removeAddressService.run(id);
    return res.send();
  }
}

export default AddressController;
