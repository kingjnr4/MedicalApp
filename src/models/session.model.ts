import { model, Schema, Document } from "mongoose";
import { ISession } from "../interfaces/sessions.interface";

const sessionSchema: Schema = new Schema<ISession>({
  userid: {
    type: String,
    required: true,
    ref:'users'
  },
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  platform: {
    type: String,
    required: true,
  },
  current: {
    type: Boolean,
    required: true,
  },
});

const sessionModel = model<Document & ISession>("sessions", sessionSchema);
export default sessionModel;
