import {NextFunction, Request, Response} from 'express';
import {CreatePlanDto} from '../dtos/plan.dto';
import {AcceptInviteDto, AddUserToSubToDto} from '../dtos/subscription.dto';
import {IUser} from '../interfaces/user.interface';
import trialModel from '../models/trial.model';
import userModel from '../models/user.model';
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
  public addUserToSub = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user: IUser = req['user'];
      const sub = await this.subService.getSub(user);
      const data: AddUserToSubToDto = req.body;
      const user1 = await userModel.findOne({email: data.email});
      if (!user1) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'user is not registered '});
      }

      const hasSub = (await this.subService.getSub(user1)) ? true : false;
      if (hasSub) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'user not subscribed'});
      }
      if (hasSub) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'user not subscribed'});
      }
      if (
        (await this.planService.findPlanById(sub.plan.toString())).spaces ==
        sub.users.length
      ) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'subscription is filled up'});
      }
     await this.subService.createInvite (user1,sub)
      return res
        .status(200)
        .send({message: 'success', reason: 'invitation sent successfully'});
    } catch (e) {
      throw e;
    }
  };
  public acceptInvite = async (   req: Request,
    res: Response,
    next: NextFunction,)=>{
     
      try {
         const data: AcceptInviteDto = req.body;
         const user:IUser = req['body']
         const isInvited = await this.subService.checkInvitedUser(data.inviteId,user)
         if (! isInvited) {
           return res
             .status(200)
             .send({message: 'failed', reason: 'user is not invited '});
         }
         if (this.subService.acceptInvite(data.inviteId)) {
           return res
             .status(200)
             .send({message: 'success',  });
         }
         return res
           .status(200)
           .send({message: 'failed', reason: 'sub has expired or invite has been used  '});
      } catch (e) {
        
      }
    }
}

export default SubscriptionController;
