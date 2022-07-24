import * as jwt from "jsonwebtoken";
import moment from "moment";
import { SECRET_KEY } from "../config";
import { HttpException } from "../exceptions/HttpException";
import { logger } from "./logger";

const generateAccessToken = (userId: string) => {
  try {
    return jwt.sign({ userId }, SECRET_KEY!, { expiresIn: '7d' });
  } catch (e) {
    logger.error(e);
  }
};

export const decodeToken = (token: string) => {
  try {
    const decoded= jwt.verify(token, SECRET_KEY!,{complete:true});
    const payload = decoded.payload as jwt.JwtPayload
    const exp = payload.exp!;
    if(moment(exp* 1000).isAfter(Date.now())){
      throw new HttpException(505,"unauthorized");
    }
    return payload['userId'] as string;
  } catch (e) {
    logger.error(e);
  }
};


const generateRefreshToken = (userId: string) => {
  try {
    return jwt.sign({ userId }, SECRET_KEY!, { expiresIn: "7d" });
  } catch (e) {
    logger.error(e);
  }
};
export const generateJWT = (userId: string) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};
