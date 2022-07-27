import mongoose, { Types } from "mongoose";

export interface ITrial {
  status: 'Active' | 'Ended';
  user: Types.ObjectId
  expiry: Date;
}