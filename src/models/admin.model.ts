import { model, Schema, Document } from 'mongoose';
import { IAdmin, Roles } from '../interfaces/admin.interface';
import { logger } from '../utils/logger';
import { compare, hashPassword } from '../utils/utils';

const adminSchema: Schema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default:Roles.SUPER
  },
});
adminSchema.pre('save', async function (next) {
  try {
    const admin = this;
    const hash = await hashPassword(admin.password);
    admin.password = hash;
    next();
  } catch (e) {
    logger.error(e);
    next();
  }
});
adminSchema.methods.checkPassword = async function (password: string) {
  try {
    let admin = this;
    const isvalid = await compare(password, admin.password);
    return isvalid;
  } catch (e) {
    logger.error(e);
  }
};

const adminModel = model<Document & IAdmin>('admins', adminSchema);
export default adminModel;
