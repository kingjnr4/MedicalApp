import {NextFunction, Request, Response} from 'express';
import {CreatePlanDto} from '../dtos/plan.dto';
import inviteModel from '../models/invite.model';

import {
  AcceptInviteDto,
  AddUserToSubToDto,
  CreateSubDto,
} from '../dtos/subscription.dto';
import {IUser} from '../interfaces/user.interface';
import trialModel from '../models/trial.model';
import userModel from '../models/user.model';
import PlanService from '../services/plan.services';
import SubService from '../services/subscription.services';
import {Paystack} from '../utils/paystack';
import {getMailForInvite, sendmail} from '../utils/mail';

class SubscriptionController {
  private planService = new PlanService();
  private subService = new SubService();
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = req['user'];
      const data = req.body;
      const plan = await this.planService.findPlanById(data.planId);
      if (await this.subService.activeSubExist(user)) {
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
    const sub = await this.subService.activeSubExist(user);
    if (sub == null) {
      return res.send('User is not subscribed');
    }
    const cancelled = await this.subService.cancel(sub);
    console.log(cancelled);

    if (cancelled == false) {
      return res.send({message:'failed'});
    }
    return res.send({message:'success'});
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
      const dup = await userModel.findById(user._id);
      if (dup.email == data.email) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'cannot send invite to yourself'});
      }
      if (!user1) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'user is not registered '});
      }

      const hasSub = (await this.subService.activeSubExist(user1))
        ? true
        : false;
      const hasSub1 = (await this.subService.getSub(user)) ? true : false;
      if (hasSub == true) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'user is subscribed'});
      }
      if (!hasSub1) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'sender is not subscribed'});
      }
      if (
        (await this.planService.findPlanById(sub.plan.toString())).spaces ==
        sub.users.length
      ) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'subscription is filled up'});
      }
      const invite = await this.subService.createInvite(user1, sub);
      const mail = getMailForInvite(invite._id.toString(), user1.email);
      sendmail(mail)
        .then(msg =>
          res
            .status(200)
            .send({message: 'success', reason: 'invitation sent successfully'}),
        )
        .catch(e => {
          return res
            .status(200)
            .send({message: 'failed', reason: 'invitation not sent'});
        });
    } catch (e) {
      throw e;
    }
  };
  public acceptInvite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: AcceptInviteDto = req.body;
      const user: IUser = req['user'];
      const invite = await inviteModel.findById(data.inviteId)
      if (!invite) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'id is not valid'});
      }
      const isInvited = await this.subService.checkInvitedUser(
        data.inviteId,
        user,
      );
      if (isInvited==false) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'user is not invited'});
      }
      if (this.subService.acceptInvite(data.inviteId)) {
        return res.status(200).send({message: 'success'});
      }
      return res.status(200).send({
        message: 'failed',
        reason: 'sub has expired or invite has been used  ',
      });
    } catch (e) {
  next(e)
    }
  };
  public switch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = req['user'];
      const sub = await this.subService.getActiveSub(user);
      const data: CreateSubDto = req.body;
      if (sub) {
        const plan = await this.planService.findPlanById(data.planId);
        if (plan) {
          const cancelled = await this.subService.cancel(sub);
          if (cancelled == true) {
              sub.users.length = 0;
              await sub.save();
            const subbed = await this.subService.createSubscription(
              user,
              plan._id,
            );
            if (subbed) {
              return res
                .status(200)
                .send({message: 'processing request'});
            }
          }
           return res
             .status(200)
             .send({message: 'failed', reason: 'error  cancelling  plan'});
        }
        return res
          .status(200)
          .send({message: 'failed', reason: 'plan  not found'});
      }
      return res
        .status(200)
        .send({message: 'failed', reason: 'user is not subscribed'});
    } catch (e) {
     next (e)
    }
  };
}

export default SubscriptionController;
