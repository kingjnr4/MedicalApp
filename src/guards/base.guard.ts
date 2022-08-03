import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/jwt';

export class BaseGuard {
  protected token: string;
  protected id: string;
  protected ip:string
  constructor(req: Request, res: Response, next: NextFunction) {
    this.token = req.headers.authorization.split(' ')[1];
     this.id = decodeToken(this.token) as string;
    this.ip=req.ip 
  }
}
