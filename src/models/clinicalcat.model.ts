import {model, Schema, Document} from 'mongoose';
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
categorySchema.post('remove',async function (res,next) {
  let doc = this;
   await clinicalModel.deleteMany({category: doc.name});
   await clinicalCatModel.deleteMany({parent: doc.name});
   next();
} );
categorySchema.post('update', async function () {
  let doc = await this.model.findOne(this.getQuery());
  await clinicalModel.updateMany({category: doc.name}, {category: doc.name});
  await clinicalCatModel.updateMany({parent: doc.name}, {parent: doc.name});
});

const clinicalCatModel = model<Document & ICategory>(
  'clinicalcategory',
  categorySchema,
);
export default clinicalCatModel;
