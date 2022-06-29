import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import UserService from "../services/user.services";
import { generateToken } from "../utils/token";

class UserController {
  private service = new UserService();
  public register =async  (req: Request, res: Response, next: NextFunction) => {
    try{
    const data:CreateUserDto = req.body
    const user = await this.service.createUser(data);
    const token = generateToken(user._id);
    
    res.status(200).send(user);
    }catch(e){
      next(e);
    }
  };
}

export default UserController;
