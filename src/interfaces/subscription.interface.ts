import {Types,Document} from 'mongoose';

export interface ISubscription {
  _id: string;
  status: 'active' |'non-renewing' |'ended';
  users: Types.ObjectId[];
  plan: Types.ObjectId;
  owner: Types.ObjectId;
  paystack_ref?: string;
  next_date: string;
  ps_email_token: string;
}

export type SubDoc = Document<any, any, any> &
  ISubscription & {
    _id: Types.ObjectId;
  };

