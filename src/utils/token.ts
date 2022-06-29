import moment from "moment";
import { IToken } from "../interfaces/token.interface";
import tokenModel from "../models/token.model";

export const generateToken =async (userId:string):Promise<IToken>=>{
const token = await  tokenModel.create({userId});
return token
}

export const verifyToken = async (id:string): Promise<Boolean> => {
  const token = await tokenModel.findById(id);
  if(token){
    const exp = token.expires
    return moment(exp).isSameOrBefore(Date.now());
  }
  return false
};