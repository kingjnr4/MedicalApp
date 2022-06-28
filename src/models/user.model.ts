import { model, Schema, Document} from "mongoose";
import { IUser } from "../interfaces/user.interface";


const userSchema: Schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  verified:{
    type: Boolean,
    required: true,
    default:false,
  },
});

const userModel = model<IUser>("User", userSchema);
export default userModel;
