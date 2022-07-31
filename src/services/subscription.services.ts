import moment from 'moment';
import {UpdateWriteOpResult} from 'mongoose';
import {CreatePlanDto} from '../dtos/plan.dto';
import {HttpException} from '../exceptions/HttpException';
import {ICard} from '../interfaces/cards.interface';
import {IPlan} from '../interfaces/plans.interface';
import {IUser} from '../interfaces/user.interface';
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
    this.gateway.init();
    const plan = await planModel.findById(planId);
    const trial = await trialModel.findOne({user: user._id});
    const date = trial.expires || Date.now();
    const metadata = JSON.stringify({});
    const start_date = moment(date).format() + '';
    const res = await this.gateway.subscribe(
      user.email,
      plan.paystack_code,
      start_date,
    );
    return res;
  }
  public subExist = async (user: IUser) => {
    const sub = subModel.findOne({user: user._id, status: {$ne: 'ended'}});
    if (sub !== null) {
      return true;
    }
    return false;
  };
}

export default SubService;
