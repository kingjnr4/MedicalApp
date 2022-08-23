import {Types} from 'mongoose';

export interface IInvite {
  subId: Types.ObjectId;
  userId: Types.ObjectId;
  used: Boolean;
}
