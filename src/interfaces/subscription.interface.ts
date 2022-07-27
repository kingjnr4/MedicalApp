import {Types} from 'mongoose';

export interface ISubscription {
  _id: string;
  status: 'active'|'recurring'|'pending'|'ended';
  email: string;
  users: Types.ObjectId[];
  plan: Types.ObjectId;
  owner:Types.ObjectId;
  paystackRef?:string
}
