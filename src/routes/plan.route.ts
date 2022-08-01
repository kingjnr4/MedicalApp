import {Router} from 'express';
import PlanController from '../controllers/plan.controller';
import {CreatePlanDto, DeletePlanDto, UpdatePlanDto} from '../dtos/plan.dto';
import {AdminGuard} from '../guards/admin.guard';
import {AuthGuard} from '../guards/auth.guard';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class PlanRoute implements IRoute {
  public path = '/plans';
  public router = Router();
  public controller = new PlanController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(CreatePlanDto, 'body', 'fields'),
      AdminGuard.createInstance,
      this.controller.create,
    );
    this.router.get(
      `${this.path}/get`,
      this.controller.get,
    );
    this.router.delete(
      `${this.path}/delete`,
      validationMiddleware(DeletePlanDto, 'body', 'key'),
      AdminGuard.createInstance,
      this.controller.delete,
    );
    this.router.post(
      `${this.path}/update`,
      validationMiddleware(UpdatePlanDto, 'body', 'fields'),
      AdminGuard.createInstance,
      this.controller.update,
    );
  }
}
export default PlanRoute;
