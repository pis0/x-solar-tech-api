import express, { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/user/services/authenticate.user.service';

const UserRoute = Router();

UserRoute.use(express.json());


UserRoute.post('/', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const authenticateUserService = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUserService.run({
    name: '', // useless for auth
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});


export default UserRoute;
