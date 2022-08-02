import {NextFunction, Request, Response} from 'express';


export class EmptyJwtGuard {
 static  check(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] as string;
        if (token) {
            next()
        }
        return res.send("please fill jwt")
  }
}
