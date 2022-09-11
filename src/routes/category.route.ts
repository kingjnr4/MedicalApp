import {Router} from 'express';
import CategoryController from '../controllers/category.controller';
import {CreateCatDto, DeleteCatDto, UpdateCatDto} from '../dtos/category.dto';
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
      `${this.path}/clinical/update`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(UpdateCatDto, 'body', 'fields'),
      this.controller.updateClinical,
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
     this.router.get(
       `${this.path}/clinical/getNoParent`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       this.controller.getAllClinicalNoChildren,
     );
     this.router.post(
       `${this.path}/antibiotic/create`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       validationMiddleware(CreateCatDto, 'body', 'fields'),
       this.controller.createAntibiotic,
     );
      this.router.post(
        `${this.path}/antibiotic/update`,
        EmptyJwtGuard.check,
        AdminGuard.createInstance,
        validationMiddleware(UpdateCatDto, 'body', 'fields'),
        this.controller.updateAntibiotic,
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
      this.router.get(
        `${this.path}/antibiotic/getNoParent`,
        EmptyJwtGuard.check,
        AdminGuard.createInstance,
        this.controller.getAllAntibioticNoChildren,
      );

  }
}

export default CategoryRoute;
