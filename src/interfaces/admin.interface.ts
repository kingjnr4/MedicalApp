import {Document, Types} from 'mongoose';


export interface IAdmin {
  _id: string;
  email: string;
  username:string;
  password: string;
  role:Roles|string;
 hashPassword: () => void;
  checkPassword: (password: string) => boolean;
}

export enum Roles {
SUPER="super",
ADMIN="admin"
}
export type AdminDoc = Document<any, any, any> &
  IAdmin & {
  _id: Types.ObjectId;
};
