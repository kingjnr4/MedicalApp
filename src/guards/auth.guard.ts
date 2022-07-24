import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import sessionModel from '../models/session.model';
import userModel from '../models/user.model';
import { BaseGuard } from './base.guard';

export class AuthGuard extends BaseGuard {
  private model;
  private session;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.model = userModel;
    this.session = sessionModel;
  }

  static async createInstance(req: Request, res: Response, next: NextFunction) {
    const guard = new AuthGuard(req, res, next);
    await guard.checkUserExists();
    return guard.checkIpExists(next);
  }

  async checkUserExists() {
    const user = await this.model.findById(this.id);
    if (!user) throw new HttpException(409, 'User not found');
    return;
  }
  async checkIpExists(next: NextFunction) {
    const ip = await this.session.findOne({ userid: this.id, current: true });
    if (ip?.ip == this.ip) {
      next();
    }
    throw new HttpException(409, 'User has logged in to another device');
  }
}
