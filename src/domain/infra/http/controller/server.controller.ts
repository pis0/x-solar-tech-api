import { Request, Response, NextFunction } from 'express';
import ApiError from '@domain/errors/api.error';

class ServerController {
  public async onError(
    err: Error,
    req: Request,
    res: Response,
    _: NextFunction,
  ): Promise<Response> {
    if (err instanceof ApiError) {
      return res.status(err.code).json({
        type: 'error',
        message: err.message,
      });
    }
    console.error(err);
    return res.status(500).json({
      type: 'error',
      message: 'Server error',
    });
  }

  public onLog(): void {
    console.log('server up!');
  }
}

export default ServerController;
