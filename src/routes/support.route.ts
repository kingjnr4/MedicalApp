import {Router} from 'express';
import SupportController from '../controllers/support.controller';
import { CreateSupportDto, OpenSupportDto, ReplySupportDto } from '../dtos/support.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { EmptyJwtGuard } from '../guards/jwtempty.guard';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class SupportRoute implements IRoute {
  public path = '/support';
  public router = Router();
  public controller =new  SupportController()
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/send`,
      EmptyJwtGuard.check,
      AuthGuard.createInstance,
      validationMiddleware(CreateSupportDto, 'body', 'fields'),
      this.controller.add
    );
     this.router.post(
       `${this.path}/reply`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       validationMiddleware(ReplySupportDto, 'body', 'fields'),
       this.controller.reply,
     );
     this.router.post(
       `${this.path}/open`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       validationMiddleware(OpenSupportDto, 'body', 'fields'),
       this.controller.open,
     );
     this.router.post(
       `${this.path}/delete`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       validationMiddleware(OpenSupportDto, 'body', 'fields'),
       this.controller.delete,
     );
     this.router.get(
       `${this.path}/getAll`,
       EmptyJwtGuard.check,
       AdminGuard.createInstance,
       this.controller.getAll,
     );
     this.router.get(
       `${this.path}/getAllUser`,
       EmptyJwtGuard.check,
       AuthGuard.createInstance,
       this.controller.getByUser,
     );
     this.router.get(
       `${this.path}/replies`,
       EmptyJwtGuard.check,
       AuthGuard.createInstance,
       this.controller.getRepliesForUser,
     );
  }
}

export default SupportRoute