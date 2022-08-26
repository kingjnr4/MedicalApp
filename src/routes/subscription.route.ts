import { Router } from "express";
import SubscriptionController from "../controllers/subscription.controller";
import { AddUserToSubToDto, CreateSubDto,AcceptInviteDto } from "../dtos/subscription.dto";
import { AuthGuard } from "../guards/auth.guard";
import { UserInfoCompleteGuard } from "../guards/info-complete.guard";
import { EmptyJwtGuard } from "../guards/jwtempty.guard";
import { UserNotBlockedGuard } from "../guards/user-blocked.guard";
import { IRoute } from "../interfaces/routes.interfaces";
import validationMiddleware from "../middlewares/validation.middleware";


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
      validationMiddleware(CreateSubDto, 'body', 'key'),
      EmptyJwtGuard.check,
      AuthGuard.createInstance,
      UserInfoCompleteGuard.createInstance,
      UserNotBlockedGuard.createInstance,
      this.controller.create,
    );
     this.router.post(
       `${this.path}/invite`,
       validationMiddleware(AddUserToSubToDto, 'body', 'key'),
       EmptyJwtGuard.check,
       AuthGuard.createInstance,
       UserInfoCompleteGuard.createInstance,
       UserNotBlockedGuard.createInstance,
       this.controller.addUserToSub,
     );
    this.router.post(
      `${this.path}/cancel`,
      EmptyJwtGuard.check,
      AuthGuard.createInstance,
      UserInfoCompleteGuard.createInstance,
      UserNotBlockedGuard.createInstance,
      this.controller.cancel,
    );
      this.router.get(
        `${this.path}/info`,
        EmptyJwtGuard.check,
        AuthGuard.createInstance,
        UserNotBlockedGuard.createInstance,
        this.controller.get,
      );
      this.router.post(
        `${this.path}/switch`,
        validationMiddleware(CreateSubDto, 'body', 'key'),
        EmptyJwtGuard.check,
        AuthGuard.createInstance,
        UserNotBlockedGuard.createInstance,
        this.controller.switch,
      );
      this.router.post(
        `${this.path}/accept`,
        validationMiddleware(AcceptInviteDto, 'body', 'key'),
        EmptyJwtGuard.check,
        AuthGuard.createInstance,
        UserNotBlockedGuard.createInstance,
        this.controller.acceptInvite,
      );
  }
}

export default SubRoute;
