import { model, Schema, Document } from "mongoose";
import { IAdmin } from "../interfaces/admin.interface";
import { logger } from "../utils/logger";
import { compare, hashPassword } from "../utils/utils";

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
});
adminSchema.pre("save", async function (next) {
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
adminSchema.methods.isValidPassword = async function (password: string) {
  try {
    let user = this;
    return await compare(password, user.password);
  } catch (e) {
    logger.error(e);
  }
};

const adminModel = model<Document & IAdmin>("admins", adminSchema);
export default adminModel;
