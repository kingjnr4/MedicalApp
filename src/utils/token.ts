import moment from "moment";
import { IToken } from "../interfaces/token.interface";
import tokenModel from "../models/token.model";

export const generateVerificationToken =async (userId:string):Promise<IToken>=>{
const token = await  tokenModel.create({userId});
return token
}

export const verifyVerificationToken = async (key:string): Promise<boolean> => {
  const token = await tokenModel.findOne({key});
  if(token){
    const exp = token.expires
    return moment(exp).isSameOrBefore(Date.now());
  }
  return false
};

export const getIdFromToken = async (key: string): Promise<string> => {
  const token = await tokenModel.findOne({ key });
  if (token) {
  return token.userId
  }
  return "";
};