import { model, Schema, Document } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { logger } from "../utils/logger";
import { compare, hashPassword } from "../utils/utils";

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
});
userSchema.pre("save", async function (next) {
  try {
    const hash = await hashPassword(this.password);
    this.password = hash;
    next();
  } catch (e) {
    logger.error(e);
    next();
  }
});
userSchema.methods.checkPassword = async function (password: string) {
  try {
    let user = this;
    const isvalid =await compare(password, user.password)
    return isvalid ;
  } catch (e) {
    logger.error(e);
  }
};

const userModel = model<Document & IUser>("User", userSchema);
export default userModel;
