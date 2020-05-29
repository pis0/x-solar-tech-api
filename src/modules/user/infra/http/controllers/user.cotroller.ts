import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { isUuid } from 'uuidv4';
import CreateUserService from '@modules/user/services/create.user.service';


class UserController {
  public async validateUserId(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res.status(400).json({
        error: 'invalid customer id.',
      });
    }
    return next();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, password,
    } = req.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.run({
      name, email, password,
    });
    delete user.password;
    return res.json(user);
  }
}

export default UserController;
