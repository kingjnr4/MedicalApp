import {model, Schema, Document} from 'mongoose';
import {IUser} from '../interfaces/user.interface';
import {logger} from '../utils/logger';
import {compare, hashPassword} from '../utils/utils';
import moment from 'moment';

const userSchema: Schema = new Schema<IUser>({
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
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: 'open',
  },
  hasCard: {
    type: Boolean,
    required: true,
    default: false,
  },
  joined: {
    type: Date,
    default: () => moment().toDate(),
  },
});
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const hash = await hashPassword(this.password);
      this.password = hash;
      next();
    } catch (e) {
      logger.error(e);
      next();
    }
  }
});
userSchema.methods.checkPassword = async function (password: string) {
  try {
    let user = this;
    const isvalid = await compare(password, user.password);
    return isvalid;
  } catch (e) {
    logger.error(e);
  }
};

const userModel = model<Document & IUser>('users', userSchema);
export default userModel;
