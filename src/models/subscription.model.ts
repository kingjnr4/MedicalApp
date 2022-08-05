import {model, Schema, Document} from 'mongoose';
import {ISubscription} from '../interfaces/subscription.interface';

const subSchema: Schema = new Schema<ISubscription>({
  status: {
    type: String,
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'users',
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'plans',
    required: true,
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'plans',
    required: true,
  },
  paystack_ref: {
    type: String,
  },
  ps_email_token: {
    type: String,
  },
  next_date:{
    type:String
  }
});

const subModel = model<Document & ISubscription>('subs', subSchema);
export default subModel;
