import {model, Schema, Document} from 'mongoose';
import {ICategory} from '../interfaces/category.interface';
import DiagnosisService from '../services/diagnosis.service';
import antibioticModel from './antibioticguide.model';
const categorySchema: Schema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
  },
});


const antibioticCatModel = model<Document & ICategory>(
  'antibioticcategory',
  categorySchema,
);
export default antibioticCatModel
