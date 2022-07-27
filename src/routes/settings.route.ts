import {Router} from 'express';
import SettingsController from '../controllers/settings.controller';
import {SetGatewayDto, SetKeyDto} from '../dtos/settings.dto';
import {AdminGuard} from '../guards/admin.guard';
import {IRoute} from '../interfaces/routes.interfaces';
import validationMiddleware from '../middlewares/validation.middleware';

class SettingsRoute implements IRoute {
  public path = '/settings';
  public router = Router();
  public indexController = new SettingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/key`,
      AdminGuard.createInstance,
      validationMiddleware(SetKeyDto, 'body', 'fields'),
      this.indexController.setKey,
    );
    this.router.post(
      `${this.path}/gateway`,
      AdminGuard.createInstance,
      validationMiddleware(SetGatewayDto, 'body', 'fields'),
      this.indexController.setGateway,
    );

    this.router.get(
      `${this.path}/gateway`,
      AdminGuard.createInstance,
      this.indexController.getGateway,
    );
    this.router.get(
      `${this.path}/key`,
      AdminGuard.createInstance,
      this.indexController.getKeys,
    );
  }
}

export default SettingsRoute;
