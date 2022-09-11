import mongoose, {model, Schema, Document} from 'mongoose';
import {ICategory} from '../interfaces/category.interface';
import DiagnosisService from '../services/diagnosis.service';
import clinicalModel from './clinicalguide.model';
const categorySchema: Schema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
  },
});


const clinicalCatModel = model<Document & ICategory>(
  'clinicalcategory',
  categorySchema,
);
export default clinicalCatModel;
