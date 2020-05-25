import express, { Router } from 'express';
import AuthenticateUserService from '../services/user/authenticate.user.service';

const UserRoute = Router();

UserRoute.use(express.json());


UserRoute.post('/', async (req, res) => {
  const {
    email, password,
  } = req.body;
  const authenticateUserService = new AuthenticateUserService();
  try {
    const { user, token } = await authenticateUserService.run({
      email, password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


export default UserRoute;
