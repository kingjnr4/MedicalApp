import {model, Schema, Document} from 'mongoose';
import {IPlan} from '../interfaces/plans.interface';
import moment from 'moment';

const planSchema: Schema = new Schema<IPlan>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  spaces: {
    type: Number,
    required: true,
  },
  paystack_code: {
    type: String,
  },
  flutterwave_code: {
    type: String,
  },
});

const planModel = model<Document & IPlan>('plans', planSchema);
export default planModel;
