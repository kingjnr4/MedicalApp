import {NextFunction, Request, Response} from 'express';
import {CreatePlanDto} from '../dtos/plan.dto';
import {IUser} from '../interfaces/user.interface';
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
      if (this.subService.subExist(user)) {
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
}

export default SubscriptionController;
