import {Types, Document} from 'mongoose';
export interface ISupport {
  _id: string;
  status: 'new' | 'open' | 'treated';
  sender: string;
  subject: string;
  message: string;
  date_created: Date;
  date_closed?: Date;
  reply?: string;
}
