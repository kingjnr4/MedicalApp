import {Router} from 'express';
import FaqController from '../controllers/faq.controller';
import {UpdateAdminDto} from '../dtos/admin.dto';
import {CreateFaqDto, DeleteFaqDto, UpdateFaqDto} from '../dtos/faq.dto';
import {UpdatePlanDto} from '../dtos/plan.dto';
import {AdminGuard} from '../guards/admin.guard';
import {EmptyJwtGuard} from '../guards/jwtempty.guard';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class FaqRoute implements IRoute {
  public path = '/faq';
  public router = Router();
  public controller = new FaqController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/add`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(CreateFaqDto, 'body', 'fields'),
      this.controller.add,
    );
    this.router.post(
      `${this.path}/update`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(UpdateFaqDto, 'body', 'fields'),
      this.controller.update,
    );
    this.router.get(`${this.path}/get`, this.controller.get)
    this.router.post(
      `${this.path}/delete`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(DeleteFaqDto, 'body', 'fields'),
      this.controller.delete,
    );
  }
}

export default FaqRoute;
