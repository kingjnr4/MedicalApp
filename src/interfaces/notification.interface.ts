import {Types, Document} from 'mongoose';
export interface INotif {
    title:string;
    message:string;
    user:Types.ObjectId
    type:'general'|'cancelled'|'subscribed'|'ended',
    uuid:string
}
export type NotifDoc = Document<any, any, any> &
  INotif & {
    _id: Types.ObjectId;
  };
