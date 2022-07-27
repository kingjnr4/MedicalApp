import {model, Schema} from 'mongoose'
import moment from 'moment';
import { ICard } from '../interfaces/cards.interface';

const cardSchema: Schema = new Schema<ICard>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  authorization: {
    type: Object,
  },
  expired: {
    type: Boolean,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  last4: {
    type: String,
    required: true,
  },
  bin: {
    type: String,
    required: true,
  },
  exp_month: {
    type: String,
    required: true,
  },
  exp_year: {
    type: String,
    required: true,
  },
  card_type: {
    type: String,
    required: true,
  },
});

const cardModel = model<Document & ICard>('cards', cardSchema);
export default cardModel;
