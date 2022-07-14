import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { logger } from "./logger";

const generateAccessToken = (userId: string) => {
  try {
    return jwt.sign({ userId }, SECRET_KEY!, { expiresIn: "15m" });
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
