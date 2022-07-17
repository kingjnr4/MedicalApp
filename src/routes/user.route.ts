import { Router } from "express";
import UserController from "../controllers/user.controller";
import { CreateUserDto, LoginUserDto, VerifyUserDto } from "../dtos/user.dto";
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
  }
}
export default UserRoute;
