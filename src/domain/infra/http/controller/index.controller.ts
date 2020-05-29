import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '@config/auth.config';
import ApiError from '@domain/errors/api.error';
import ITokenDto from '@domain/dto/itoken.dto';

class IndexController {
  public logReq(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
  }

  public validateToken(req: Request, res: Response, next: NextFunction): void {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new ApiError('invalid/missing token.');
    }
    const [, token] = auth.split(' ');
    const payload = verify(token, AuthConfig.jwt.secret);
    const { sub } = payload as ITokenDto;
    req.user = {
      id: sub,
    };
    next();
  }
}

export default IndexController;
