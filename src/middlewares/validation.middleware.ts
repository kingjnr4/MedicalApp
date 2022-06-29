import { plainToClass, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";
import { logger } from "../utils/logger";

const MESSAGES = {
  userReg:" fill all fields"
}
Type msgtype = keyof MESSAGES
const validationMiddleware = (
  type: any,
  value:  "body" | "query" | "params" = "body",
  msg:msgtype,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        logger.error(errors);
        const message = MESSAGE[msg];
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
