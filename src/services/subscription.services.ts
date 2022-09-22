import moment from 'moment';
import {UpdateWriteOpResult} from 'mongoose';
import {CreatePlanDto} from '../dtos/plan.dto';
import {HttpException} from '../exceptions/HttpException';
import {ICard} from '../interfaces/cards.interface';
import {IPlan, PlanDoc} from '../interfaces/plans.interface';
import {ISubscription, SubDoc} from '../interfaces/subscription.interface';
import {IUser, UserDoc} from '../interfaces/user.interface';
import cardModel from '../models/card.model';
import inviteModel from '../models/invite.model';
import planModel from '../models/plan.model';
import subModel from '../models/subscription.model';
import trialModel from '../models/trial.model';
import userModel from '../models/user.model';
import {Gateway} from '../utils/gateway';
import {getMailForInvite, sendmail} from '../utils/mail';
import {isEmpty} from '../utils/utils';

class SubService {
  public model = subModel;
  private gateway = new Gateway();
  public async createSubscription(user: IUser, planId: string) {
    await this.gateway.init();
    const plan = await planModel.findById(planId);
    const trial = await trialModel.findOne({user: user._id});
    if (!trial) {
      throw new HttpException(401, 'Please kindly add your card to your account');
    }
    const date = Date.now();
    const metadata = JSON.stringify({});
    //const start_date = moment(date).format() + '';
    const res = await this.gateway.subscribe(plan.paystack_code, user.email);
    return res;
  }
  public addUserToSub = async (user: UserDoc, sub: SubDoc) => {
    sub.users.push(user._id);
    sub.save();
  };
  public createInvite = async (user: UserDoc, sub: SubDoc) => {
    const invite = await inviteModel.create({
      userId: user._id,
      subId: sub._id,
    });

    return invite;
  };
  public acceptInvite = async (id: string) => {
    const invite = await inviteModel.findById(id);
    const sub = await subModel.findById(invite.subId);
    if (invite.used == true || sub.status == 'ended') {
      return false;
    }
    const user = await userModel.findById(invite.userId);
    await this.addUserToSub(user, sub);
    invite.used = true;
    await invite.save();
    const trial = await trialModel.findOne({user: user._id});
    trial.status = 'Ended';
    await trial.save();
    return true;
  };
  public checkInvitedUser = async (id: string, user: IUser) => {
    const invite = await inviteModel.findById(id);
    console.log(invite.userId.toString());
    console.log(user._id);

    if (invite.userId.toString() == user._id) {
      return true;
    }
    return false;
  };

  public activeSubExist = async (user: IUser) => {
    const sub = await subModel.findOne({
      users: {$in: [user._id]},
      status: {$nin: ['ended', 'non-renewing']},
    });
    console.log(sub);
    if (sub !== null) {
      return sub;
    }
    return null;
  };
  public getSub = async (user: IUser) => {
    const sub = await subModel.findOne({
      owner: user._id,
      status: {$ne: 'Ended'},
    });
    if (sub !== null) {
      return sub;
    }
  };
  public getActiveSub = async (user: IUser) => {
    const sub = await subModel.findOne({
      owner: user._id,
      status: {$nin: ['ended', 'non-renewing']},
    });
    if (sub !== null) {
      return sub;
    }
  };
  public getTrial = async (user: IUser) => {
    const trial = trialModel.findOne({
      user: user._id,
      status: {$ne: 'Ended'},
    });
    if (trial !== null) {
      return trial;
    }
    return null;
  };
  public getCurrentSub = async (user: IUser) => {
    const trial = await trialModel.findOne({
      user: user._id,
      status: {$ne: 'Ended'},
    });
    if (trial) {
      return {
        name: 'Free Trial',
        expires: trial.expires,
        renewing: false,
        spaces: 0,
      };
    }
    const sub = await subModel.findOne({
      users: {$in: [user._id]},
      status: {$ne: 'ended'},
    });

    if (sub) {
      const plan = await planModel.findById(sub.plan);
      return {
        name: plan.name,
        expires: sub.next_date + '',
        renewing: sub.status == 'active' ? true : false,
        spaces: 0,
      };
    }
    const sub1 = await subModel.findOne({
      owner: user._id,
      status: {$ne: 'ended'},
    });

    if (sub1) {
      const plan = await planModel.findById(sub1.plan);
      return {
        name: plan.name,
        expires: sub1.next_date + '',
        renewing: sub1.status == 'active' ? true : false,
        spaces: plan.spaces - sub1.users.length,
      };
    }
    return null;
  };
  public cancel = async (sub: ISubscription) => {
    await this.gateway.init();
    const cancelled = await this.gateway.cancelSub(sub);
    return cancelled;
  };
}

export default SubService;
