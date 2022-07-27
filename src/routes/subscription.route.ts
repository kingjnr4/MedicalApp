import { Router } from "express";
import SubscriptionController from "../controllers/subscription.controller";
import { AuthGuard } from "../guards/auth.guard";
import { UserInfoCompleteGuard } from "../guards/info-complete.guard";
import { IRoute } from "../interfaces/routes.interfaces";


class SubRoute implements IRoute {
  public path = "/";
  public router = Router();
  private controller = new SubscriptionController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/subscribe',
      AuthGuard.createInstance,
      UserInfoCompleteGuard.createInstance,
      this.controller.create,
    );
  }
}

export default SubRoute;
