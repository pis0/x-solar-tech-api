import express, { Router, Request, Response } from 'express';
import { isUuid } from 'uuidv4';
import CreateUserService from '../services/user/create.user.service';
import UpdateUserService from '../services/user/update.user.service';
import RemoveUserService from '../services/user/remove.user.service';
import ListUserService from '../services/user/list.user.service';

const UserRoute = Router();

function validateUserId(req: Request, res: Response, next: any): any {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      error: 'invalid customer id.',
    });
  }
  return next();
}

UserRoute.use('/:id', validateUserId);
UserRoute.use(express.json());


UserRoute.get('/', async (req, res) => {
  const listUserService = new ListUserService();
  try {
    const list = await listUserService.run();
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


UserRoute.post('/', async (req, res) => {
  const {
    name, email, password,
  } = req.body;
  const createUserService = new CreateUserService();
  try {
    const user = await createUserService.run({
      name, email, password,
    });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


UserRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name, email, password,
  } = req.body;
  const updateUserService = new UpdateUserService();
  try {
    const updatedUser = await updateUserService.run(id, {
      name, email, password,
    });
    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


UserRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeUserService = new RemoveUserService();
  try {
    await removeUserService.run(id);
    return res.send();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default UserRoute;
