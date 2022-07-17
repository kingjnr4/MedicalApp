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
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    const hash = hashPassword(user.password);
    user.password = hash;
    next();
  } catch (e) {
    logger.error(e);
    next(e);
  }
});
userSchema.methods.isValidPassword = async function (password: string){
  try {
      let user = this;
    return await compare(password, user.password);
  } catch (e) {
    logger.error(e);
  }
};

const userModel = model<Document & IUser>("User", userSchema);
export default userModel;