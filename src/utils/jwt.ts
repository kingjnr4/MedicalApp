import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import moment from "moment";
import { brotliCompress } from "zlib";
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
    const payload = jwt.verify(token, SECRET_KEY!) as JwtPayload;
    const exp = payload.exp!;
    if(moment(exp* 1000).isBefore(Date.now())){
      throw new HttpException(505,"unauthorized");
    }
    return payload['userId'] as string;
  } catch (e) {
   logger.error(e)
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
    // refreshToken: generateRefreshToken(userId),
  };
};
