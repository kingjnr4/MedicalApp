import {model, Schema, Document} from 'mongoose';
import { INotif } from '../interfaces/notification.interface';

const noteSchema: Schema = new Schema<INotif>({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type:{
    type:String,
    required:true,
    default:'general'
  },
  uuid:{
    type:String
  }
});

const notifModel = model<Document & INotif>('notifications', noteSchema);
export default notifModel;
