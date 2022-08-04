import {   plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";
import { logger } from "../utils/logger";

const MESSAGES = {
  fields:" fill all fields",
  key:"key is empty"
}
type msgType = keyof typeof MESSAGES
const validationMiddleware = (
  type: any,
  value:  "body" | "query" | "params" = "body",
  msg:msgType,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = false
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        logger.error(errors);
        const message = MESSAGES[msg];
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
