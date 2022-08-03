import {NextFunction, Request, Response} from 'express';


export class EmptyJwtGuard {
 static  check(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
        if (token) {
           return next();
        }
        return res.send("please fill jwt")
  }
}
