export interface IAdmin {
  _id: string;
  email: string;
  username:string;
  password: string;
  role:Roles;
 hashPassword: () => void;
  checkPassword: (password: string) => boolean;
}

export enum Roles {
SUPER="super",
ADMIN="admin"
}
