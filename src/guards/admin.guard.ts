import adminModel from '../models/admin.model';
import {NextFunction, Request, Response} from 'express';
import {HttpException} from '../exceptions/HttpException';
import {BaseGuard} from './base.guard';
import {Model, Document} from 'mongoose';
import {IAdmin} from '../interfaces/admin.interface';
export class AdminGuard extends BaseGuard {
  private model: Model<Document<any, any, any> & IAdmin, {}, {}, {}, any>;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.model = adminModel;
  }

  static async createInstance(req: Request, res: Response, next: NextFunction) {
    try {
      const guard = new AdminGuard(req, res, next);
      let admin = await guard.checkAdminExists();
      req['admin'] = admin;
      return next();
    } catch (e) {
      next(e);
    }
  }
  async checkAdminExists() {
    const admin = await this.model.findById(this.id);
    if (!admin) throw new HttpException(409, 'Admin not found');
    return admin;
  }
}
