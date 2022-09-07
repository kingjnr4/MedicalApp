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
categorySchema.post('remove', async function (res,next) {
  let doc = this;
  await antibioticModel.deleteMany({category: doc.name});
  await antibioticCatModel.deleteMany({parent: doc.name});
  next();

});
categorySchema.post('update', async function () {
  let doc = await this.model.findOne(this.getQuery());
  await antibioticModel.updateMany({category: doc.name}, {category: doc.name});
  await antibioticCatModel.updateMany({parent: doc.name}, {parent: doc.name});
});
const antibioticCatModel = model<Document & ICategory>(
  'antibioticcategory',
  categorySchema,
);
export default antibioticCatModel;
