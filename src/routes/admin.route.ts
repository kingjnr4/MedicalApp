import {Router} from 'express';
import AdminController from '../controllers/admin.controller';
import UserController from '../controllers/user.controller';
import { CreateAdminDto, LoginAdminDto } from '../dtos/admin.dto';
import {
  ChangePassDto,
  CreateUserDto,
  GenLinkDto,
  LoginUserDto,
  VerifyUserDto,
} from '../dtos/user.dto';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class AdminRoute implements IRoute {
  public path = '/admin';
  public router = Router();
  public controller = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateAdminDto, 'body', 'fields'),
      this.controller.register,
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginAdminDto, 'body', 'fields'),
      this.controller.login,
    );
     this.router.post(
       `${this.path}/passlink`,
       validationMiddleware(GenLinkDto, 'body', 'fields'),
       this.controller.generatePasswordLink,
     );
     this.router.post(
       `${this.path}/changepass`,
       validationMiddleware(ChangePassDto, 'body', 'fields'),
       this.controller.changePassword,
     );
    
  }
}
export default AdminRoute;
