import {NextFunction, Request, Response} from 'express';
import {CreatePlanDto} from '../dtos/plan.dto';
import {IUser} from '../interfaces/user.interface';
import trialModel from '../models/trial.model';
import PlanService from '../services/plan.services';
import SubService from '../services/subscription.services';
import {Paystack} from '../utils/paystack';

class SubscriptionController {
  private planService = new PlanService();
  private subService = new SubService();
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = req['user'];
      const data = req.body;
      const plan = await this.planService.findPlanById(data.planId);
      if (await this.subService.subExist(user)) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'user is already subscribed'});
      }
      const sub = await this.subService.createSubscription(user, plan._id);
      if (sub) {
        return res.status(200).send({message: 'processing request', sub});
      }
      return res
        .status(200)
        .send({message: 'failed', reason: 'payment failed'});
    } catch (e) {
      next(e);
    }
  };
  public cancel = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req['user'];
    const sub = await this.subService.subExist(user);
    if (sub == null) {
      return res.send('User is not subscribed');
    }
    const cancelled = await this.subService.cancel(sub);
    console.log(cancelled);

    if (cancelled == false) {
      return res.send('Error cancelling your plan');
    }
    return res.send('Plan  canceled successfully');
  };
  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = req['user'];
      const sub = await this.subService.getCurrentSub(user);
      if (sub) {
        return res.status(200).send(sub);
      }
      return res.status(200).send({sub: 'no sub '});
    } catch (e) {
      throw e;
    }
  };
  public addUserToSub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = req['user'];
      return res.status(200).send({sub: 'no sub '});
    } catch (e) {
      throw e;
    }
  };
}

export default SubscriptionController;
