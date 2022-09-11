import {Document, model, Schema} from 'mongoose';
import {IAntibioticsGuide} from '../interfaces/diagnosis.interface';

const antibioticSchema: Schema = new Schema<IAntibioticsGuide>({
  name: {
    type: String,
    required: true,
  },
  category: {type: String, required: true},
  withPenicillin: {type: String, required: true},
  withoutPenicillin: {type: String, required: true},
});

const antibioticModel = model<IAntibioticsGuide & Document>(
  'antibioticsGuide',
  antibioticSchema,
);

export default antibioticModel;
