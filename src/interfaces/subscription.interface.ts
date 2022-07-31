import {Types} from 'mongoose';

export interface ISubscription {
  _id: string;
  status: 'active'|'ended';
  users: Types.ObjectId[];
  plan: Types.ObjectId;
  owner:Types.ObjectId;
  paystackRef?:string
  next_date:string
}
