import {UpdateWriteOpResult} from 'mongoose';
import {CreatePlanDto} from '../dtos/plan.dto';
import {HttpException} from '../exceptions/HttpException';
import {ICard} from '../interfaces/cards.interface';
import {IPlan} from '../interfaces/plans.interface';
import {IUser} from '../interfaces/user.interface';
import cardModel from '../models/card.model';
import planModel from '../models/plan.model';
import subModel from '../models/subscription.model';
import {Gateway} from '../utils/gateway';
import {isEmpty} from '../utils/utils';

class SubService {
  public model = subModel;
  private gateway = new Gateway();
  public async createSubscription(user: IUser, planId: string) {
    this.gateway.init();
     const plan = await planModel.findById(planId);
    // const card: ICard = await cardModel.findOne({userId: user._id});

    // const amount = plan.price * 100;
    const metadata = JSON.stringify({});
    const res = await this.gateway.initCard(user.email);
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
