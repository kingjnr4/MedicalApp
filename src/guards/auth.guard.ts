import { NextFunction, Request, Response } from 'express';
import { Model,Document } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';
import { ISession } from '../interfaces/sessions.interface';
import { IUser } from '../interfaces/user.interface';
import sessionModel from '../models/session.model';
import userModel from '../models/user.model';
import { BaseGuard } from './base.guard';

export class AuthGuard extends BaseGuard {
  private model: Model<Document<any, any, any> & IUser, {}, {}, {}, any>;
  private session: Model<Document<any, any, any> & ISession, {}, {}, {}, any>;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.model = userModel;
    this.session = sessionModel;
  }

  static async createInstance(req: Request, res: Response, next: NextFunction) {
   try {
      const guard = new AuthGuard(req, res, next);
    let user = await guard.checkUserExists();
    req['user'] = user;
    return next()
   } catch (e) {
      next(e);
   }
  }

  async checkUserExists() {
    const user = await this.model.findById(this.id);
    if (!user) throw new HttpException(409, 'User not found');
    return user;
  }
  async checkIpExists(next: NextFunction) {
    const ip = await this.session.findOne({ userid: this.id, current: true });
    if (ip?.ip == this.ip) {
      next();
    }
    throw new HttpException(409, 'User has logged in to another device');
  }
}
