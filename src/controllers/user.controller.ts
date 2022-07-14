import { NextFunction, Request, Response } from "express";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import UserService from "../services/user.services";
import { generateJWT } from "../utils/jwt";
import { logger } from "../utils/logger";
import { getMail, sendmail } from "../utils/mail";
import { generateVerificationToken } from "../utils/token";

class UserController {
  private service = new UserService();
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateUserDto = req.body;
      const user = await this.service.createUser(data);
      const token = await generateVerificationToken(user._id);
      const mail = getMail(token);
      sendmail(user.email, mail)
        .then((msg) => res.status(200).send({ message: "success" }))
        .catch((e) => next(e));
    } catch (e) {
      next(e);
    }
  };
   public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginUserDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
        const jwt = generateJWT(user._id);
       return res.status(200).send({ message: "success", jwt });
    } catch (e) {
      next(e);
    }
  };
  public verify = async (req: Request, res: Response, next: NextFunction) => {
    const data: LoginUserDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
  }
}

export default UserController;
