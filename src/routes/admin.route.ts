import {Router} from 'express';
import AdminController from '../controllers/admin.controller';
import {
  ChangeMailDto,
  CreateAdminDto,
  DeleteAdminDto,
  DeleteNotifDto,
  LoginAdminDto,
  UpdateAdminDto,
} from '../dtos/admin.dto';
import {ChangePassDto, GenLinkDto} from '../dtos/user.dto';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';
import {SuperAdminGuard} from '../guards/super-admin.guard';
import {AdminGuard} from '../guards/admin.guard';
import {EmptyJwtGuard} from '../guards/jwtempty.guard';

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
      EmptyJwtGuard.check,
      SuperAdminGuard.createInstance,
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
    this.router.post(
      `${this.path}/changemail`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(ChangeMailDto, 'body', 'fields'),
      this.controller.changeEmail,
    );
    this.router.get(
      `${this.path}/all`,
      EmptyJwtGuard.check,
     AdminGuard.createInstance,
      this.controller.getAllAdmin,
    );
    this.router.post(
      `${this.path}/delete`,
      EmptyJwtGuard.check,
      SuperAdminGuard.createInstance,
      validationMiddleware(DeleteAdminDto, 'body', 'fields'),
      this.controller.deleteAdmin,
    );
    this.router.post(
      `${this.path}/deletenotifs`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(DeleteNotifDto, 'body', 'fields'),
      this.controller.deleteNotifications,
    );
    this.router.post(
      `${this.path}/info`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getInfo,
    );
    this.router.post(
      `${this.path}/updateinfo`,
      EmptyJwtGuard.check,
      SuperAdminGuard.createInstance,
      validationMiddleware(UpdateAdminDto, 'body', 'fields'),
      this.controller.updateInfo,
    );
    this.router.get(
      `${this.path}/notifications`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getNotifs,
    );
  }
}

export default AdminRoute;
