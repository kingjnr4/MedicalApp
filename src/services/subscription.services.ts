import moment from 'moment';
import {UpdateWriteOpResult} from 'mongoose';
import {CreatePlanDto} from '../dtos/plan.dto';
import {HttpException} from '../exceptions/HttpException';
import {ICard} from '../interfaces/cards.interface';
import {IPlan, PlanDoc} from '../interfaces/plans.interface';
import {ISubscription} from '../interfaces/subscription.interface';
import {IUser, UserDoc} from '../interfaces/user.interface';
import cardModel from '../models/card.model';
import planModel from '../models/plan.model';
import subModel from '../models/subscription.model';
import trialModel from '../models/trial.model';
import {Gateway} from '../utils/gateway';
import {isEmpty} from '../utils/utils';

class SubService {
  public model = subModel;
  private gateway = new Gateway();
  public async createSubscription(user: IUser, planId: string) {
    await this.gateway.init();
    const plan = await planModel.findById(planId);
    // const trial = await trialModel.findOne({user: user._id});
    const date = Date.now();
    const metadata = JSON.stringify({});
    const start_date = moment(date).format() + '';
    const res = await this.gateway.subscribe(
      plan.paystack_code,
      user.email,
      start_date,
    );
    return res;
  }
  public subExist = async (user: IUser) => {
    const sub = await subModel.findOne({
      user: user._id,
      status: {$ne: 'Ended'},
    });
    console.log(sub);

    if (sub !== null) {
      return sub;
    }
    return null;
  };
  public getSub = async (user: IUser) => {
    const sub = await subModel.findOne({
      user: user._id,
      status: {$ne: 'Ended'},
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
      };
    }
    const sub = await subModel.findOne({
      user: user._id,
      status: {$ne: 'Ended'},
    });

    if (sub) {
      console.log(sub.next_date);
    
      const plan = await planModel.findById(sub.plan);
      return {
        name: plan.name,
        expires: sub.next_date+'',
        renewing: sub.status == 'active' ? true : false,
      };
    }
  };
  public cancel = async (sub: ISubscription) => {
    await this.gateway.init();
    const cancelled = await this.gateway.cancelSub(sub);
    return cancelled;
  };
}

export default SubService;
