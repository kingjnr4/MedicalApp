import {model, Schema} from 'mongoose';
import {IToken} from '../interfaces/token.interface';
import {IKey} from '../interfaces/key.interface';
import { ITrial } from '../interfaces/trial.interface';
import moment from 'moment';

const trialSchema: Schema = new Schema<ITrial>({
  status: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'users'
  },
  expires: {
    type: Date,
    required: true,
    default: () => moment().add(1, 'month').toDate(),
  },
});

const trialModel = model<Document & ITrial>('trials', trialSchema);
export default trialModel;
