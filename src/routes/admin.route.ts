import {Router} from 'express';
import AdminController from '../controllers/admin.controller';
import UserController from '../controllers/user.controller';
import { CreateAdminDto, LoginAdminDto } from '../dtos/admin.dto';
import {
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
  }
}
export default AdminRoute;
