import {Types} from 'mongoose';

export interface IBlock {
  _id: string;
  user: Types.ObjectId;
  reason: string;
}
