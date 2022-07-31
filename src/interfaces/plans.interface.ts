import {Types, Document} from 'mongoose';

export interface IPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  spaces: number;
  paystack_code:string;
  flutterwave_code:string;
}
export type  PlanDoc = Document<any, any, any> &
  IPlan & {
    _id: Types.ObjectId;
  };
