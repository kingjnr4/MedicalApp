import { Types ,Document} from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  number?: string;
  password: string;
  verified: boolean;
  status: stat;
  joined:Date,
  hasCard:boolean;
  hashPassword: () => void;
  checkPassword: (password: string) => boolean;
}
type stat = 'blocked' | 'open';

export type UserDoc = Document<any, any, any> &
  IUser & {
    _id: Types.ObjectId;
  };
