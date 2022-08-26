import {NextFunction, Request, Response} from 'express';
import { Model,Document } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';
import { IUser } from '../interfaces/user.interface';
export class UserNotBlockedGuard {
    private user:IUser
  static async createInstance(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
  try {
      const instance = new UserNotBlockedGuard(req, res, next);
      instance.checkUserIsNotBlocked();
      return next();
  } catch (e) {
    next(e);
  }
    
  }
  constructor(req: Request, _res: Response, _next: NextFunction) {
    this.user=req['body']
  }
  async checkUserIsNotBlocked() {
  if (this.user.status == 'open') {
    return;
  } 
  throw new HttpException(409, 'User is blocked');
  }
}
