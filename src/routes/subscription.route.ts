import { Router } from "express";
import { AuthGuard } from "../guards/auth.guard";
import { IRoute } from "../interfaces/routes.interfaces";


class IndexRoute implements IRoute {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/create',AuthGuard.createInstance,)
  }
}

export default IndexRoute;
