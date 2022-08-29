import {Router} from 'express';
import StatController from '../controllers/stat.controller';
import {
  SendMailDto,
  SendNotificationDto,
  SendSingleMailDto,
} from '../dtos/admin.dto';
import {AdminGuard} from '../guards/admin.guard';
import {EmptyJwtGuard} from '../guards/jwtempty.guard';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class StatRoute implements IRoute {
  public path = '/statistics';
  public router = Router();
  public controller = new StatController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/all`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getHomeStats,
    );
    this.router.get(
      `${this.path}/users`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getAllUsers,
    );
    this.router.get(
      `${this.path}/transactions`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getTransactions,
    );
    this.router.post(
      `${this.path}/sendmail`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(SendMailDto, 'body', 'fields'),
      this.controller.sendEmail,
    );
    this.router.post(
      `${this.path}/sendsinglemail`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(SendSingleMailDto, 'body', 'fields'),
      this.controller.sendEmail,
    );
    this.router.post(
      `${this.path}/sendnotifs`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      validationMiddleware(SendNotificationDto, 'body', 'fields'),
      this.controller.sendInAppNotifications,
    );
    this.router.get(
      `${this.path}/recentusers`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getNewUsers,
    );
    this.router.get(
      `${this.path}/allsubs`,
      EmptyJwtGuard.check,
      AdminGuard.createInstance,
      this.controller.getAllSubs,
    );
  }
}

export default StatRoute;
