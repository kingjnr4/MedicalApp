import {Types} from 'mongoose';

export interface ISubscription {
  _id: string;
  status: 'active' | 'ended';
  users: Types.ObjectId[];
  plan: Types.ObjectId;
  owner: Types.ObjectId;
  paystack_ref?: string;
  next_date: string;
  ps_email_token: string;
}
