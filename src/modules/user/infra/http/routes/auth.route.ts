import express, { Router } from 'express';
import AuthenticateUserService from '@modules/user/services/authenticate.user.service';

const UserRoute = Router();

UserRoute.use(express.json());


UserRoute.post('/', async (req, res) => {
  const {
    email, password,
  } = req.body;
  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.run({
    email, password,
  });

  delete user.password;

  return res.json({ user, token });
});


export default UserRoute;
