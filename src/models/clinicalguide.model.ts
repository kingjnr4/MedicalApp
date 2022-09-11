import {Document, model, Schema} from 'mongoose';
import {IClinicalGuide} from '../interfaces/diagnosis.interface';

const clinicalSchema: Schema = new Schema<IClinicalGuide>({
  category: {type: String, required: true},
  disease: {type: String, required: true},
  guide: {type: String, required: true},
});
const clinicalModel = model<IClinicalGuide & Document>(
  'clinicalGuide',
  clinicalSchema,
);

export default clinicalModel;
