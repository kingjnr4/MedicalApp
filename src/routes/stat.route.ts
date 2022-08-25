import { Router } from 'express';
import StatController from '../controllers/stat.controller';
import { AdminGuard } from '../guards/admin.guard';
import {IRoute} from '../interfaces/routes.interfaces';

class StatRoute implements IRoute {
  public path = '/statistics';
  public router = Router();
  public controller = new StatController()
  constructor() {
      this.initializeRoutes();
  }
  
    private initializeRoutes() {
        this.router.get(
          `${this.path}/all`,
          AdminGuard.createInstance,
          this.controller.getHomeStats,
        );
          this.router.get(
            `${this.path}/users`,
            AdminGuard.createInstance,
            this.controller.getAllUsers,
          );
          this.router.get(
            `${this.path}/transactions`,
            AdminGuard.createInstance,
            this.controller.getTransactions,
          );
           this.router.get(
             `${this.path}/sendmail`,
             AdminGuard.createInstance,
             this.controller.sendEmail,
           );
            this.router.get(
              `${this.path}/sendnotifs`,
              AdminGuard.createInstance,
              this.controller.sendInAppNotifications,
            );
    }

}

export default StatRoute