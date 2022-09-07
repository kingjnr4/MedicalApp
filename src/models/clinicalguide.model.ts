import {Document, model, Schema} from 'mongoose';
import {IClinicalGuide} from '../interfaces/diagnosis.interface';

const clinicalSchema: Schema = new Schema<IClinicalGuide>({});
const clinicalModel = model<IClinicalGuide & Document>(
  'clinicalGuide',
  clinicalSchema,
);

export default clinicalModel;
