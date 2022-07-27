import { NextFunction,Request,Response } from "express";
import userModel from '../models/user.model';
import { Model,Document } from 'mongoose';
import { IUser } from "../interfaces/user.interface";
import { HttpException } from "../exceptions/HttpException";

export class UserInfoCompleteGuard {
   
  constructor(req: Request, res: Response, next: NextFunction) {
        
  }

  static async createInstance(req: Request, res: Response, next: NextFunction) {
    const guard = new UserInfoCompleteGuard(req, res, next);
 await guard.checkInfoExists(req['user']);
    return next()
  }
    checkInfoExists(user:IUser) {
        if (!user.firstname || !user.lastname) {
              throw new HttpException(401, 'Info incomplete');
        }
        return true
    }
}