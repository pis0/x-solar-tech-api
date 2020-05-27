import express, {
  Router, Request, Response, NextFunction,
} from 'express';
import { isUuid } from 'uuidv4';
import CreateUserService from '@modules/user/services/create.user.service';

const UserRoute = Router();

function validateUserId(req: Request, res: Response, next: NextFunction): any {
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


UserRoute.post('/', async (req, res) => {
  const {
    name, email, password,
  } = req.body;
  const createUserService = new CreateUserService();

  const user = await createUserService.run({
    name, email, password,
  });

  delete user.password;

  return res.json(user);
});


export default UserRoute;
