import {Types, Document} from 'mongoose';
export interface INotif {
    title:string;
    message:string;
    user:Types.ObjectId
}
export type NotifDoc = Document<any, any, any> &
  INotif & {
    _id: Types.ObjectId;
  };
