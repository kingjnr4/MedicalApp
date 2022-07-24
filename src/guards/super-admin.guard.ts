import adminModel from '../models/admin.model';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { BaseGuard } from './base.guard';
import { Roles } from '../interfaces/admin.interface';
export class SuperAdminGuard extends BaseGuard {
  private model;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.model = adminModel;
  }

  static async createInstance(req: Request, res: Response, next: NextFunction) {
    const guard = new SuperAdminGuard(req, res, next);
    await guard.checkAdminExists(next);
  }
  async checkAdminExists(next: NextFunction) {
    const user = await this.model.findOne({ _id: this.id, role: Roles.SUPER });
    if (!user) throw new HttpException(409, 'Super Admin not found ');
    return next();
  }
}
