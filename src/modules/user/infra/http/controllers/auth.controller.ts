import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/user/services/authenticate.user.service';


class AuthController {
  public async create(req: Request, res: Response): Promise<Response> {
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
  }
}

export default AuthController;
