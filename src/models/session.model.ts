import { model, Schema, Document } from "mongoose";
import { ISession } from "../interfaces/sessions.interface";

const sessionSchema: Schema = new Schema<ISession>({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  platform: {
    type: String,
    required: true,
    unique: true,
  },
});

const sessionModel = model<Document & ISession>("sessions", sessionSchema);
export default sessionModel;
