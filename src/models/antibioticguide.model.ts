import {Document, model, Schema} from 'mongoose';
import {IAntibioticsGuide} from '../interfaces/diagnosis.interface';

const antibioticSchema: Schema = new Schema<IAntibioticsGuide>({});

const antibioticModel = model<IAntibioticsGuide & Document>(
  'antibioticsGuide',
  antibioticSchema,
);

export default antibioticModel;
