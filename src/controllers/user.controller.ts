import { NextFunction, Request, Response } from "express";
import { BlockUserDto, CreateUserDto, LoginUserDto, VerifyUserDto } from "../dtos/user.dto";
import { HttpException } from "../exceptions/HttpException";
import tokenModel from "../models/token.model";
import UserService from "../services/user.services";
import { generateJWT } from "../utils/jwt";
import { logger } from "../utils/logger";
import { getMail, sendmail } from "../utils/mail";
import {
  generateVerificationToken,
  getIdFromToken,
  verifyVerificationToken,
} from "../utils/token";

class UserController {
  private service = new UserService();
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateUserDto = req.body;
      const user = await this.service.createUser(data);
      const token = await generateVerificationToken(user._id);
      const mail = getMail(token);
      sendmail(user.email, mail)
        .then((msg) => {
          logger.info(msg)
          return res.status(200).send({ message: "success"}
      
      )})
        .catch((e) => next(e));
    } catch (e) {
      next(e);
    }
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginUserDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
     if (user.checkPassword(data.password)==false){
       throw new HttpException(401,"your password is incorrect")
     }
      const jwt = generateJWT(user._id);
      
      return res.status(200).send({ message: "success", jwt });
    } catch (e) {
      next(e);
    }
  };
  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: VerifyUserDto = req.body;
      const isValid = await verifyVerificationToken(data.key);
      const id = await getIdFromToken(data.key);
      if (isValid && id !== "") {
        const verified = await this.service.verify(id);
        return res.status(200).send({ message: "success", verified });
      }
    } catch (e) {
      next(e);
    }
  };
  public block = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: BlockUserDto = req.body;
      
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;
