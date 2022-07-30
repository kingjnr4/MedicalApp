import { Router } from "express";
import UserController from "../controllers/user.controller";
import { ChangePassDto, CreateUserDto, GenLinkDto, LoginUserDto, UpdateUserDto, VerifyUserDto } from "../dtos/user.dto";
import { AuthGuard } from "../guards/auth.guard";
import { IRoute } from "../interfaces/routes.interfaces";
import validationMiddleware from "../middlewares/validation.middleware";

class UserRoute implements IRoute {
  public path = "/users";
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto, "body", "fields"),
      this.controller.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginUserDto, "body", "fields"),
      this.controller.login
    );
    this.router.post(
      `${this.path}/verify`,
      validationMiddleware(VerifyUserDto, "body", "fields"),
      this.controller.verify
    );
     this.router.post(
       `${this.path}/generate`,
       validationMiddleware(GenLinkDto, 'body', 'fields'),
       this.controller.generateLink,
     );
     this.router.post(
       `${this.path}/complete`,
       validationMiddleware(UpdateUserDto, 'body', 'fields'),
       AuthGuard.createInstance,
       this.controller.updateInfo,
     );
      this.router.post(
        `${this.path}/card`,
        AuthGuard.createInstance,
        this.controller.addCard,
      );
        this.router.post(
          `${this.path}/genpasslink`,
          validationMiddleware(GenLinkDto, 'body', 'fields'),
          this.controller.generatePasswordLink,
        );
          this.router.post(
            `${this.path}/changepass`,
            validationMiddleware(ChangePassDto, 'body', 'fields'),
            this.controller.changePassword,
          );
  }
}
export default UserRoute;
