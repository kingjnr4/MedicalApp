import { Router } from "express";
import SubscriptionController from "../controllers/subscription.controller";
import { AuthGuard } from "../guards/auth.guard";
import { UserInfoCompleteGuard } from "../guards/info-complete.guard";
import { EmptyJwtGuard } from "../guards/jwtempty.guard";
import { IRoute } from "../interfaces/routes.interfaces";


class SubRoute implements IRoute {
  public path = "/subscription";
  public router = Router();
  private controller = new SubscriptionController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/subscribe`,
      EmptyJwtGuard.check,
      AuthGuard.createInstance,
      UserInfoCompleteGuard.createInstance,
      this.controller.create,
    );
  }
}

export default SubRoute;
