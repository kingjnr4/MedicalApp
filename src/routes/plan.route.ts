import { Router } from "express";
import PlanController from "../controllers/plan.controller";
import { CreatePlanDto } from "../dtos/plan.dto";
import { IRoute } from "../interfaces/routes.interfaces";
import validationMiddleware from "../middlewares/validation.middleware";

class PlanRoute implements IRoute {
  public path = "/plans";
  public router = Router();
  public controller = new PlanController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
 this.router.post(
      `${this.path}/create`,
      validationMiddleware(CreatePlanDto, "body","fields"),
      this.controller.create
    )
  }
}
export default PlanRoute;
