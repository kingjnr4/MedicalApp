import moment from 'moment';
import {model, Schema, Document} from 'mongoose';
import {ISupport} from '../interfaces/support.interface';

const supportSchema: Schema = new Schema<ISupport>({
  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:'new'
  },
  date_created: {
    type: Date,
    default: moment().toDate(),
  },
  date_closed: {
    type: Date,
  },
  reply: {
    type: String,
  },
  sender: {
    type:String,
    required: true,
  },
});

const supportModel = model<Document & ISupport>('support', supportSchema);
export default supportModel;
