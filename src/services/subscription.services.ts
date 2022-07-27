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
    const card: ICard = await cardModel.findOne({userId: user._id});
    const plan = await planModel.findById(planId);
    const amount = plan.price * 100;
    const metadata = JSON.stringify({});
    const res = await this.gateway.charge(
      user.email,
      amount,
      metadata,
      card.authorization_code,
    )
    if (res.data.status == 'success') {
      const sub = await subModel.create({
        plan: plan._id,
        users: [user._id],
        email: user.email,
        owner: user._id,
        status:'recurring'
      });
      return sub
    }
     if (res.data.status == 'pending') {
       const sub = await subModel.create({
         plan: plan._id,
         users: [user._id],
         email: user.email,
         owner: user._id,
         status: 'pending',
       });
       return sub;
     }
    return null;
  }
}

export default SubService;
