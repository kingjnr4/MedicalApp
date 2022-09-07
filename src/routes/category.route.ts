import {Router} from 'express';
import CategoryController from '../controllers/category.controller';
import {CreateCatDto, DeleteCatDto} from '../dtos/category.dto';
import {AdminGuard} from '../guards/admin.guard';
import {EmptyJwtGuard} from '../guards/jwtempty.guard';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class CategoryRoute implements IRoute {
  public path = '/categories';
  public router = Router();
  private controller = new CategoryController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/clinical/create`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(CreateCatDto, 'body', 'fields'),
      this.controller.createClinical,
    );
    this.router.post(
      `${this.path}/clinical/delete`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(DeleteCatDto, 'body', 'fields'),
      this.controller.deleteClinical,
    );
    this.router.get(
      `${this.path}/clinical/get`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getAllClinical,
    );
     this.router.post(
       `${this.path}/antibiotic/create`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       validationMiddleware(CreateCatDto, 'body', 'fields'),
       this.controller.createAntibiotic,
     );
      this.router.post(
        `${this.path}/antibiotic/delete`,
        EmptyJwtGuard.check,
        AdminGuard.createInstance,
        validationMiddleware(DeleteCatDto, 'body', 'fields'),
        this.controller.deleteAntibiotic,
      );
      this.router.get(
        `${this.path}/antibiotic/get`,
        EmptyJwtGuard.check,
        AdminGuard.createInstance,
        this.controller.getAllAntibiotic,
      );
  }
}

export default CategoryRoute;
