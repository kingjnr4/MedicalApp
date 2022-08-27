import adminModel from '../models/admin.model';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { BaseGuard } from './base.guard';
import { IAdmin, Roles } from '../interfaces/admin.interface';
import { Model,Document } from 'mongoose';
export class SuperAdminGuard extends BaseGuard {
  private model:Model<Document<any, any, any> & IAdmin, {}, {}, {}, any>;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.model = adminModel;
  }

  static async createInstance(req: Request, res: Response, next: NextFunction) {
  try {
    const guard = new SuperAdminGuard(req, res, next);
    let admin = await guard.checkAdminExists();
    req['admin'] = admin;
    return next()
  }
  catch (e){
    next(e)
  }
  }
  async checkAdminExists() {
    const admin = await this.model.findOne({ _id: this.id, role: Roles.SUPER });
    if (!admin) throw new HttpException(409, 'Super Admin not found ');
    return admin;
  }
}
