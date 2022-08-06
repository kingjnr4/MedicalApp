import { NextFunction,Request,Response } from "express";
import userModel from '../models/user.model';
import { Model,Document } from 'mongoose';
import { IUser } from "../interfaces/user.interface";
import { HttpException } from "../exceptions/HttpException";

export class UserInfoCompleteGuard {
   
  constructor(req: Request, res: Response, next: NextFunction) {
        
  }

  static async createInstance(req: Request, res: Response, next: NextFunction) {
  try {
      const guard = new UserInfoCompleteGuard(req, res, next);
      await guard.checkInfoExists(req['user']);
      return next();
  } catch (e) {
    next(e);
  }
  }
    checkInfoExists(user:IUser) {
        if (!user.firstname || !user.lastname || !user.number ) {
              throw new HttpException(401, 'Info incomplete');
        }
        return true
    }
}