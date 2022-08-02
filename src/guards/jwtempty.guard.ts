import {NextFunction, Request, Response} from 'express';


export class EmptyJwtGuard {
 static token: string;
 static  check(req: Request, res: Response, next: NextFunction) {
    this.token = req.headers['x-access-token'] as string;
        if (this.token) {
            next ()
        }
        return res.send("please fill jwt")
  }
}
