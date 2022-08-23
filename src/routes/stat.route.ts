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
          `${this.path}/userslen`,
          AdminGuard.createInstance,
          this.controller.getUsersCount,
        );
    }

}

export default StatRoute