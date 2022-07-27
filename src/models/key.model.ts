import { model, Schema } from 'mongoose';
import { IToken } from '../interfaces/token.interface';
import { IKey } from '../interfaces/key.interface';

const keySchema: Schema = new Schema<IKey>({
  name: {
    type: String,
    required: true,
  },
  test: {
    type: String,
    required: true,
  },
  live: {
    type: String,
    required: true,
  },
});

const keyModel = model<Document & IKey>('keys', keySchema);
export default keyModel;
