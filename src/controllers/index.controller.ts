
import { NextFunction, Request, Response } from "express";

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("<h1>hello after hrs </h1>");
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
