import {model, Schema, Document} from 'mongoose';
import {ISubscription} from '../interfaces/subscription.interface';

const subSchema: Schema = new Schema<ISubscription>({
  status: {
    type: String,
  },
  email: {
    type: String,
    required: true,
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
  paystackRef:{
    type:String
  }
});

const subModel = model<Document & ISubscription>('subs', subSchema);
export default subModel;
