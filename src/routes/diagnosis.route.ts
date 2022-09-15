import {Router} from 'express';
import DiagnosisController from '../controllers/diagnosis.controller';
import { DeleteCatDto } from '../dtos/category.dto';
import { CreateAntibioticDto, CreateClinicalDto, DeleteAntibioticDto, DeleteClinicalDto, SearchDto, UpdateAntibioticDto, UpdateClinicalDto } from '../dtos/diagnosis.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
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
      this.router.post(
        `${this.path}/clinical/delete`,
        EmptyJwtGuard.check,
        AdminGuard.createInstance,
        validationMiddleware(DeleteClinicalDto, 'body', 'fields'),
        this.controller.deleteClinicalGuide,
      );
       this.router.post(
         `${this.path}/antibiotic/delete`,
         EmptyJwtGuard.check,
         AdminGuard.createInstance,
         validationMiddleware(DeleteAntibioticDto, 'body', 'fields'),
         this.controller.deleteAntibioticGuide,
       );
        this.router.get(
          `${this.path}/clinical/get`,
          EmptyJwtGuard.check,
          AdminGuard.createInstance,
          this.controller.getClinicalGuide,
        );
         this.router.get(
           `${this.path}/antibiotic/get`,
           EmptyJwtGuard.check,
           AdminGuard.createInstance,
           this.controller.getAntibioticGuide,
         );
          this.router.post(
            `${this.path}/antibiotic/search`,
            EmptyJwtGuard.check,
            AuthGuard.createInstance,
            validationMiddleware(SearchDto, 'body', 'fields'),
            this.controller.searchAntibioticGuide,
          );
           this.router.post(
             `${this.path}/clinical/search`,
             EmptyJwtGuard.check,
             AuthGuard.createInstance,
             validationMiddleware(SearchDto, 'body', 'fields'),
             this.controller.searchClinicalGuide,
           );
             this.router.post(
               `${this.path}/antibiotic/single`,
               EmptyJwtGuard.check,
               AuthGuard.createInstance,
               validationMiddleware(DeleteCatDto, 'body', 'fields'),
               this.controller.getAntibioticGuideSingle,
             );
           this.router.post(
             `${this.path}/clinical/single`,
             EmptyJwtGuard.check,
             AuthGuard.createInstance,
             validationMiddleware(DeleteCatDto, 'body', 'fields'),
             this.controller.getClinicalGuideSingle,
           );
            this.router.post(
              `${this.path}/antibiotic/singlecat`,
              EmptyJwtGuard.check,
              AuthGuard.createInstance,
              validationMiddleware(SearchDto, 'body', 'fields'),
              this.controller.singleCategoryAntibiotic,
            );
            this.router.post(
              `${this.path}/clinical/singlecat`,
              EmptyJwtGuard.check,
              AuthGuard.createInstance,
              validationMiddleware(SearchDto, 'body', 'fields'),
              this.controller.singleCategoryClinical,
            );
  }
  


}

export default DiagnosisRoute;
