import { NextFunction, Request, Response } from "express";
import { CreateAdminDto, LoginAdminDto } from "../dtos/admin.dto";
import {  CreateUserDto, LoginUserDto,  } from "../dtos/user.dto";
import { HttpException } from "../exceptions/HttpException";
import tokenModel from "../models/token.model";
import AdminService from "../services/admin.services";
import { generateJWT } from "../utils/jwt";
import { logger } from "../utils/logger";
import { getMailForVerify, sendmail } from "../utils/mail";
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
      const admin = await this.service.createAdmin(data);
      
      const details = { name: admin.username };
        return res.status(200).send({ message: 'success',details});
    } catch (e) {
      next(e);
    }
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginAdminDto = req.body;
      const admin = await this.service.findAdminById(data.email);
        const isvalid = await admin.checkPassword(data.password);
        if (isvalid == false) {
          throw new HttpException(401, 'your password is incorrect');
        }
      const jwt = generateJWT(admin._id);
      return res.status(200).send({ message: "success", jwt });
    } catch (e) {
      next(e);
    }
  };

}

export default AdminController;
