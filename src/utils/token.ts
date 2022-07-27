import moment from "moment";
import { log } from "winston";
import { IToken } from "../interfaces/token.interface";
import tokenModel from "../models/token.model";

export const generateVerificationToken =async (userId:string):Promise<IToken>=>{
await tokenModel.deleteMany({userId})
const token = await  tokenModel.create({userId});
return token
}

export const verifyVerificationToken = async (key:string): Promise<boolean> => {
  const token = await tokenModel.findOne({key});
  if(token){
    const exp = token.expires
    return moment(exp).isSameOrAfter(Date.now());
  }
  return false
};

export const getIdFromToken = async (key: string): Promise<string> => {
  const token = await tokenModel.findOne({ key });
  if (token) {
  return token.userId
  }
  return ""
};