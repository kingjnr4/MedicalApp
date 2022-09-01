import {model, Schema, Document} from 'mongoose';
import {IFaq} from '../interfaces/faq.interface';

const faqSchema: Schema = new Schema<IFaq>({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const faqModel = model<Document & IFaq>('faqs', faqSchema);
export default faqModel;
