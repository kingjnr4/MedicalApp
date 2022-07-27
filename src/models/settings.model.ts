import { model, Schema } from 'mongoose';
import { ISettings } from '../interfaces/settings.interface';

const settingsSchema: Schema = new Schema<ISettings>({
  prop: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const settingsModel = model<Document & ISettings>('settings', settingsSchema);
export default settingsModel;
