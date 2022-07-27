import { Types } from "mongoose";

export interface ICard {
  card_type: string;
  authorization_code: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  expired: boolean;
  bin: string;
  authorization: object;
  bank?: string;
  user: Types.ObjectId;
}