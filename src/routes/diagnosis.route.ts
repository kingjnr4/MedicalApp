import {Router} from 'express';
import DiagnosisController from '../controllers/diagnosis.controller';
import { CreateAntibioticDto, CreateClinicalDto, UpdateAntibioticDto, UpdateClinicalDto } from '../dtos/diagnosis.dto';
import { AdminGuard } from '../guards/admin.guard';
import { EmptyJwtGuard } from '../guards/jwtempty.guard';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class DiagnosisRoute implements IRoute {
  public path = '/diagnosis';
  public router = Router();
  public controller = new DiagnosisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/antibiotic/create`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(CreateAntibioticDto, 'body', 'fields'),
      this.controller.createAntiBioticGuide,
    );
    this.router.post(
      `${this.path}/clinical/create`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware (CreateClinicalDto,'body','fields'),
      this.controller.createClinicalGuide,
    );
     this.router.post(
       `${this.path}/clinical/update`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       validationMiddleware(UpdateClinicalDto, 'body', 'fields'),
       this.controller.updateClinicalGuide,
     );
     this.router.post(
       `${this.path}/antibiotic/update`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       validationMiddleware(UpdateAntibioticDto, 'body', 'fields'),
       this.controller.updateAntiBioticGuide,
     );
  }
}

export default DiagnosisRoute;
