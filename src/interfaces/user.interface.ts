export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  status: stat;
  hashPassword: () => void;
  checkPassword: (password: string) => boolean;
}
type stat = "blocked" | "open";