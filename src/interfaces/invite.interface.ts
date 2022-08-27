import {Types} from 'mongoose';

export interface IInvite {
  _id: string;
  subId: Types.ObjectId;
  userId: Types.ObjectId;
  used: Boolean;
}
