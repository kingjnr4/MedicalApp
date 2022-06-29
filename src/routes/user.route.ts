import { Router } from "express";
import UserController from "../controllers/user.controller";
import { IRoute } from "../interfaces/routes.interfaces";

class UserRoute implements IRoute {
  public path = "/users";
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.controller.register);
  }
}