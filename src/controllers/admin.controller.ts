import { NextFunction, Request, Response } from "express";
import { CreateAdminDto, LoginAdminDto } from "../dtos/admin.dto";
import {  CreateUserDto, LoginUserDto,  } from "../dtos/user.dto";
import tokenModel from "../models/token.model";
import AdminService from "../services/admin.services";
import { generateJWT } from "../utils/jwt";
import { logger } from "../utils/logger";
import { getMail, sendmail } from "../utils/mail";
import {
  generateVerificationToken,
  getIdFromToken,
  verifyVerificationToken,
} from "../utils/token";

class AdminController {
  private service = new AdminService();
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateAdminDto = req.body;
      const user = await this.service.createAdmin(data);
      const token = await generateVerificationToken(user._id);
      const mail = getMail(token);
    } catch (e) {
      next(e);
    }
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginAdminDto = req.body;
      const user = await this.service.findAdminById(data.email);
      const jwt = generateJWT(user._id);
      return res.status(200).send({ message: "success", jwt });
    } catch (e) {
      next(e);
    }
  };

}

export default AdminController;